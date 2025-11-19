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
  const { results, loading } = useSelector((state) => state.youtube);

  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    const cleanQuery = query.trim();
    const tagString = searchTags.join(" ");

    const finalQuery = [cleanQuery, tagString].filter(Boolean).join(" ");

    if (!finalQuery) return;

    dispatch(searchYoutube(finalQuery));
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

      {!loading && results.length === 0 && (
        <PlaceholderMessage>Start searching to add videos</PlaceholderMessage>
      )}

      {results.length > 0 && (
        <ResultsList>
          {results
            .filter((v) => v.id)
            .map((v) => (
              <ResultItem key={v.id}>
                <ThumbnailWrapper>
                  <Thumbnail src={v.thumbnail} />
                  <PlayIcon />
                </ThumbnailWrapper>
                <ResultTitle>{v.title}</ResultTitle>
                <AddButton type="button">Add</AddButton>
              </ResultItem>
            ))}
        </ResultsList>
      )}
    </PanelWrapper>
  );
}
