import { useState, useEffect } from "react";
import * as S from "./AuthForm.styles.jsx";
import {
  CreatePlaylistFormButton,
  AddRemoveButton,
} from "./CreatePlaylistForm.styles.jsx";
import toast from "react-hot-toast";
import { playlistsApi } from "../api/playlists.js";

export default function AddVideoForm({ playlistId }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [typing, setTyping] = useState(false);
  const [timer, setTimer] = useState(null);
  const [playlistVideos, setPlaylistVideos] = useState([]); // existing videos in playlist

  // --- Search suggestions (auto-complete) ---
  useEffect(() => {
    if (!query.trim()) {
      setSuggestions([]);
      return;
    }
    // Debounce typing
    if (timer) clearTimeout(timer);
    const newTimer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${encodeURIComponent(
            query
          )}`
        );
        const data = await res.json();
        setSuggestions(data[1]?.slice(0, 6) || []);
      } catch {
        setSuggestions([]);
      }
    }, 300);
    setTimer(newTimer);
  }, [query]);

  // --- Search videos ---
  async function searchVideos(term) {
    if (!term.trim()) return;
    setLoading(true);
    setSuggestions([]);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/youtube/search?q=${encodeURIComponent(
          term
        )}`
      );
      const data = await res.json();
      setResults(data);
    } catch (err) {
      toast.error("Search failed", { id: "yt-search-error" });
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    async function loadPlaylistVideos() {
      try {
        const res = await playlistsApi.getVideos(playlistId);
        setPlaylistVideos(
          res.videos.map((v) => ({ id: v.id, youtube_key: v.youtube_key }))
        );
      } catch (err) {
        console.error("Failed to load playlist videos:", err);
      }
    }
    loadPlaylistVideos();
  }, [playlistId]);

  async function handleAdd(video) {
    const alreadyIn = playlistVideos.includes(video.id);

    if (alreadyIn) {
      // Remove
      try {
        await playlistsApi.removeVideo(playlistId, video.id);
        setPlaylistVideos((prev) => prev.filter((id) => id !== video.id));
        toast.success(`Removed “${video.title}”`, { id: "video-removed" });
      } catch (err) {
        toast.error("Failed to remove video", { id: "video-remove-error" });
        console.error(err);
      }
    } else {
      // Add
      try {
        await playlistsApi.addVideo(playlistId, {
          youtube_key: video.id,
          title: video.title,
        });
        setPlaylistVideos((prev) => [...prev, video.id]);
        toast.success(`Added “${video.title}”`, { id: "video-added" });
      } catch (err) {
        toast.error("Failed to add video", { id: "video-add-error" });
        console.error(err);
      }
    }
  }

  return (
    <div style={{ width: "100%", marginTop: "2rem" }}>
      <S.AuthFormGroup
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          searchVideos(query);
        }}
      >
        <S.AuthLabel>Search YouTube</S.AuthLabel>
        <div style={{ position: "relative" }}>
          <S.AuthInput
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search videos (e.g. lofi hip hop)"
            autoComplete="off"
          />
          {suggestions.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                left: 0,
                right: 0,
                background: "#fff",
                border: "1px solid #ccc",
                listStyle: "none",
                margin: 0,
                padding: 0,
                zIndex: 10,
              }}
            >
              {suggestions.map((s, i) => (
                <li
                  key={i}
                  style={{
                    padding: "8px 12px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                  }}
                  onClick={() => {
                    setQuery(s);
                    searchVideos(s);
                  }}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}
        </div>
        <CreatePlaylistFormButton
          type="submit"
          style={{ marginTop: "0.75rem" }}
        >
          {loading ? "Searching..." : "Search"}
        </CreatePlaylistFormButton>
      </S.AuthFormGroup>

      {results.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            marginTop: "1.5rem",
            padding: 0,
          }}
        >
          {results.map((v) => {
            const isInPlaylist = playlistVideos.includes(v.id);
            return (
              <li
                key={v.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  marginBottom: "12px",
                }}
              >
                <img
                  src={v.thumbnail}
                  alt={v.title}
                  width="120"
                  height="67"
                  style={{ borderRadius: "4px", objectFit: "cover" }}
                />
                <span style={{ flex: 1 }}>{v.title}</span>
                <AddRemoveButton
                  type="button"
                  onClick={() => handleAdd(v)}
                  buttonaction={isInPlaylist ? "remove" : "add"}
                >
                  {isInPlaylist ? "Remove" : "Add"}
                </AddRemoveButton>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
