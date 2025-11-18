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
} from "./AddVideoPanel.styles.jsx";

import { Input } from "../../../styles/form.js";
import { useDispatch, useSelector } from "react-redux";
import { searchYoutube } from "../../../store/youtubeSlice";

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
          {results.map((v) => (
            <ResultItem key={v.id}>
              <Thumbnail src={v.thumbnail} />
              <ResultTitle>{v.title}</ResultTitle>
              <AddButton type="button">Add</AddButton>
            </ResultItem>
          ))}
        </ResultsList>
      )}
    </PanelWrapper>
  );
}
