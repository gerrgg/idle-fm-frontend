import { useState, useEffect } from "react";
import {
  PanelWrapper,
  SearchBar,
  SuggestionsBox,
  SuggestionItem,
  ResultsList,
  ResultItem,
  Thumbnail,
  ResultTitle,
  AddButton,
  PlaceholderMessage,
  ThumbnailWrapper,
  Icon,
} from "./AddVideoPanel.styles.jsx";

import { Input } from "../../../styles/form.js";
import { useDispatch, useSelector } from "react-redux";
import { searchYoutube } from "../../../store/youtubeSlice";
import { addVideoToPlaylist } from "../../../store/playlistVideosSlice";

const PlayIcon = () => {
  return (
    <Icon
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </Icon>
  );
};

export default function AddVideoPanel({ searchTags }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");

  const { results: allResults, loading } = useSelector(
    (state) => state.youtube
  );

  const playlist = useSelector((state) => state.playlists.current);

  const [visible, setVisible] = useState([]);
  const [remaining, setRemaining] = useState([]);
  const [used, setUsed] = useState(new Set());

  useEffect(() => {
    if (!playlist || allResults.length === 0) return;

    const playlistVideos = playlist.videos || [];
    const playlistIds = new Set(playlistVideos.map((v) => v.youtube_key));

    const filtered = allResults.filter((video) => !playlistIds.has(video.id));

    const first8 = filtered.slice(0, 8);
    const rest = filtered.slice(8);

    setVisible(first8);
    setRemaining(rest);
    setUsed(new Set([...playlistIds, ...first8.map((v) => v.id)]));
  }, [allResults, playlist]);

  function handleSearch(e) {
    e.preventDefault();

    const cleanQuery = query.trim();
    const tagString = searchTags.join(" ");

    const finalQuery =
      [cleanQuery, tagString].filter(Boolean).join(" ") + " music";

    if (!finalQuery) return;

    dispatch(searchYoutube(finalQuery));
  }

  function handleAddVideoToPlaylist(video) {
    if (!playlist) return;

    dispatch(
      addVideoToPlaylist({
        playlistId: playlist.id,
        youtube_key: video.id,
        title: video.title,
      })
    );

    const updatedUsed = new Set(used);
    updatedUsed.add(video.id);

    const next = remaining.find((v) => !updatedUsed.has(v.id));

    setUsed(updatedUsed);

    setVisible((prev) => {
      const without = prev.filter((v) => v.id !== video.id);
      return next ? [...without, next] : without;
    });

    setRemaining((prev) => prev.filter((v) => v.id !== next?.id));
  }

  useEffect(() => {
    if (searchTags.length > 0) {
      dispatch(searchYoutube(searchTags.join(" ")));
    } else {
      setQuery("");
    }
  }, [searchTags]);

  return (
    <PanelWrapper>
      <form onSubmit={handleSearch}>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search YouTube…"
        />
      </form>

      {loading && <PlaceholderMessage>Searching...</PlaceholderMessage>}

      {!loading && visible.length === 0 && (
        <PlaceholderMessage>No more videos available</PlaceholderMessage>
      )}

      {visible.length > 0 && (
        <ResultsList>
          {visible.map((v) => (
            <ResultItem key={v.id}>
              <ThumbnailWrapper>
                <Thumbnail src={v.thumbnail} />
                <PlayIcon />
              </ThumbnailWrapper>
              <ResultTitle>{v.title}</ResultTitle>
              <AddButton onClick={() => handleAddVideoToPlaylist(v)}>
                Add
              </AddButton>
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </PanelWrapper>
  );
}
