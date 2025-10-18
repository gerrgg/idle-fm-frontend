// TempHomePage.jsx
import * as S from "./TempHomepage.styles";
import YouTubeAudioPlayer from "../components/YoutubeAudioPlayer.jsx";
import PlaylistSelector from "../components/PlaylistSelector.jsx";
import MainLayout from "../layouts/MainLayout.jsx";
import { useEffect, useState } from "react";
import Gif from "../components/Gif.jsx";
import { usersApi } from "../api/users.js";
import { playlistsApi } from "../api/playlists.js";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function TempHomePage({ user, handleLogout }) {
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [manualPlayTick, setManualPlayTick] = useState(0);
  const [loading, setLoading] = useState(true);
  const [resolvedGifs, setResolvedGifs] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user?.id) return; // wait until user is loaded
    async function fetchPlaylists() {
      try {
        const playlists = await usersApi.getPlaylists(user.id);
        const filteredPlaylists = playlists.filter((p) => p.videos?.length > 0);
        setPlaylists(filteredPlaylists);

        if (filteredPlaylists.length === 0) {
          toast("Create your first playlist!", {
            id: "no-playlists-error",
          });
          navigate("/create-playlist");
        }

        setPlaylists(filteredPlaylists || []);
        setSelectedPlaylistId(filteredPlaylists?.[0]?.id || null);
      } catch {
        toast.error("❌ Failed to load playlists", {});
      }
    }
    fetchPlaylists();
  }, [user?.id]);

  useEffect(() => {
    if (!selectedPlaylistId) return;

    async function fetchPlaylist() {
      try {
        const res = await fetch(
          `${
            import.meta.env.VITE_API_URL
          }/playlists/${selectedPlaylistId}/videos`,
          { credentials: "include" }
        );
        const data = await res.json();
        setPlaylist(data.videos || []);
      } catch (err) {
        console.error("❌ Failed to load playlist", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPlaylist();
  }, [selectedPlaylistId]);

  const next = () => setCurrentIndex((i) => (i + 1) % playlist.length);

  const prev = () =>
    setCurrentIndex((i) => (i - 1 + playlist.length) % playlist.length);

  const handleEnded = () => next();

  useEffect(() => {
    window.onTrackEnd = handleEnded;
    return () => (window.onTrackEnd = null);
  }, [playlist]);

  if (loading) return <S.StatusText>Loading playlist…</S.StatusText>;

  if (playlist.length === 0) navigate("/create-playlist");

  const current = playlist[currentIndex];

  return (
    <MainLayout user={user} handleLogout={handleLogout}>
      <Gif
        key={currentIndex}
        tenorID={current.tenor_key}
        index={currentIndex}
        resolvedGifs={resolvedGifs}
        setResolvedGifs={setResolvedGifs}
      />

      <S.Wrapper>
        <S.Title className="title">Idle.fm — Live API Demo</S.Title>
        <PlaylistSelector
          selectedPlaylistId={selectedPlaylistId}
          setSelectedPlaylistId={setSelectedPlaylistId}
          playlists={playlists}
        />
        <S.StatusText>
          Playing {currentIndex + 1}/{playlist.length}
        </S.StatusText>
        <S.Controls>
          <button onClick={prev}>⏮️ Prev</button>
          <button onClick={() => setManualPlayTick((n) => n + 1)}>
            ▶️ Start/Play
          </button>
          <button onClick={next}>⏭️ Next</button>
        </S.Controls>
        <YouTubeAudioPlayer
          videoKey={current.youtube_key}
          onEnded={handleEnded}
          manualPlayTick={manualPlayTick}
        />
      </S.Wrapper>
    </MainLayout>
  );
}
