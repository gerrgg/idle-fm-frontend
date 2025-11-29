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
import { Button } from "../../../styles/button.js";
import { useDispatch, useSelector } from "react-redux";
import { searchYoutube } from "../../../store/youtubeThunks.js";
import { addVideoToPlaylistNormalized } from "../../../store/playlistVideosThunks.js";
import { playYoutubeSearchPreview } from "../../../store/playerSlice.js";

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

export default function AddVideoPanel({ playlist, searchTags }) {
  const dispatch = useDispatch();
  const [query, setQuery] = useState("");
  const { queue, queueIndex } = useSelector((s) => s.player);
  const currentVideo = queue[queueIndex];

  const { results: allResults, loading } = useSelector(
    (state) => state.youtube
  );

  const playlistVideos = useSelector(
    (state) =>
      playlist?.videoIds?.map((id) => state.videosEntities.byId[id]) ?? []
  );

  const [visible, setVisible] = useState([]);
  const [remaining, setRemaining] = useState([]);
  const [used, setUsed] = useState(new Set());

  useEffect(() => {
    if (!playlist || allResults.length === 0) return;

    const playlistYoutubeKeys = new Set(
      playlistVideos.map((v) => v.youtube_key)
    );

    const filtered = allResults.filter((v) => !playlistYoutubeKeys.has(v.id));

    const first8 = filtered.slice(0, 8);
    const rest = filtered.slice(8);

    setVisible(first8);
    setRemaining(rest);

    setUsed(new Set([...playlistYoutubeKeys, ...first8.map((v) => v.id)]));
  }, [allResults, playlist]);

  function handleSearch(e) {
    e.preventDefault();

    const cleanQuery = query.trim();
    const tagString = searchTags.join(" ");

    const finalQuery =
      [cleanQuery, tagString].filter(Boolean).join(" ") + " music";

    dispatch(searchYoutube(finalQuery));
  }

  function handleAddVideoToPlaylist(video) {
    if (!playlist) return;

    dispatch(
      addVideoToPlaylistNormalized({
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

  function handleViewMore() {
    if (remaining.length === 0) return;

    const CHUNK_SIZE = 8;

    // Get the next group (up to 8)
    const nextChunk = remaining.slice(0, CHUNK_SIZE);

    // Always keep max 8 visible
    const updatedVisible = [
      ...visible.slice(nextChunk.length), // remove same number from front
      ...nextChunk, // add new ones
    ];

    setVisible(updatedVisible);
    setRemaining((prev) => prev.slice(nextChunk.length));
  }

  useEffect(() => {
    if (searchTags.length > 0) {
      dispatch(searchYoutube(searchTags.join(" ")));
    } else {
      setQuery("");
    }
  }, [searchTags, playlist]);

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
              <ThumbnailWrapper
                className={currentVideo?.youtube_key === v.id ? "active" : null}
                onClick={() =>
                  dispatch(
                    playYoutubeSearchPreview({
                      youtube_key: v.id,
                      title: v.title,
                      thumbnail: v.thumbnail,
                    })
                  )
                }
              >
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

      {remaining.length > 0 && (
        <Button variant="outline" onClick={handleViewMore}>
          Refresh
        </Button>
      )}
    </PanelWrapper>
  );
}
