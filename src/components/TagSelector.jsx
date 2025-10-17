import { useState, useEffect } from "react";
import * as S from "./TagSelector.styles.jsx";

const TagSelector = ({ availableTags = [], selectedTags = [], onChange }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function handleChange(val) {
    setInput(val);
    const filtered = availableTags.filter(
      (t) =>
        t.toLowerCase().includes(val.toLowerCase()) && !selectedTags.includes(t)
    );
    setSuggestions(filtered.slice(0, 5));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      addTag(input.trim());
    } else if (e.key === "Backspace" && !input && selectedTags.length) {
      removeTag(selectedTags.length - 1);
    }
  }

  function addTag(tag) {
    if (!selectedTags.includes(tag)) onChange([...selectedTags, tag]);
    setInput("");
    setSuggestions([]);
  }

  function removeTag(index) {
    const updated = selectedTags.filter((_, i) => i !== index);
    onChange(updated);
  }

  return (
    <S.TagInputWrapper>
      {selectedTags.map((tag, i) => (
        <S.Tag key={i}>
          {tag}
          <S.RemoveTag onClick={() => removeTag(i)}>×</S.RemoveTag>
        </S.Tag>
      ))}
      <S.TagInput
        type="text"
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add tags (e.g. lofi, trap)"
      />
      {suggestions.length > 0 && (
        <S.SuggestionList>
          {suggestions.map((s, i) => (
            <li key={i} onClick={() => addTag(s)}>
              {s}
            </li>
          ))}
        </S.SuggestionList>
      )}
    </S.TagInputWrapper>
  );
};

export default TagSelector;
