import { useState } from "react";
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

export default function AddVideoPanel() {
  const dispatch = useDispatch();
  const { results, loading } = useSelector((state) => state.youtube);

  const [query, setQuery] = useState("");

  function handleSearch(e) {
    e.preventDefault();

    if (!query.trim()) return;
    dispatch(searchYoutube(query));
  }

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
