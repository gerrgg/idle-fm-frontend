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
  const { results, loading } = useSelector((state) => state.youtube);
  const playlist = useSelector((state) => state.playlists.current);

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
    if (!playlist) return null;

    const payload = {
      playlistId: playlist.id,
      youtube_key: video.id,
      video_title: video.title,
    };

    dispatch(addVideoToPlaylist(payload));
  }

  useEffect(() => {
    if (searchTags.length > 0) {
      dispatch(searchYoutube(searchTags.join(" ")));
    } else {
      setQuery("");
    }
  }, [searchTags]);

  const filteredResults = results.filter(
    (video) => !playlist?.videos?.some((v) => v.youtube_key === video.id)
  );

  // console.log("Filtering search results...");
  console.log("Playlist videos:", playlist?.videos);
  // console.log("Search results:", filteredResults);

  // results.forEach((video) => {
  //   const match = playlist?.videos?.some((v) => v.youtube_key === video.id);
  //   console.log(`Video ${video.id} (${video.title}) match?`, match);
  // });

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

      {!loading && results.length === 0 && (
        <PlaceholderMessage>Start searching to add videos</PlaceholderMessage>
      )}

      {filteredResults.length > 0 ? (
        <ResultsList>
          {filteredResults.map((v) => (
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
      ) : (
        !loading && (
          <PlaceholderMessage>No more videos available</PlaceholderMessage>
        )
      )}
    </PanelWrapper>
  );
}
