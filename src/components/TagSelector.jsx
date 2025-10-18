import { useState } from "react";
import * as S from "./TagSelector.styles.jsx";

const TagSelector = ({ availableTags = [], selectedTags = [], onChange }) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  function handleChange(val) {
    setInput(val);
    const filtered = availableTags.filter(
      (t) =>
        t.name.toLowerCase().includes(val.toLowerCase()) &&
        !selectedTags.some((sel) => sel.id === t.id)
    );
    setSuggestions(filtered.slice(0, 5));
  }

  function handleKeyDown(e) {
    if (e.key === "Enter" && input.trim()) {
      e.preventDefault();
      const existing = availableTags.find(
        (t) => t.name.toLowerCase() === input.trim().toLowerCase()
      );
      if (existing) addTag(existing);
      else addTag({ name: input.trim() }); // no id
    } else if (e.key === "Backspace" && !input && selectedTags.length) {
      removeTag(selectedTags.length - 1);
    }
  }

  function addTag(tag) {
    if (!selectedTags.some((t) => t.id === tag.id)) {
      onChange([...selectedTags, tag]);
    }
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
        <S.Tag key={tag.id}>
          {tag.name}
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
          {suggestions.map((s) => (
            <li key={s.id} onClick={() => addTag(s)}>
              {s.name}
            </li>
          ))}
        </S.SuggestionList>
      )}
    </S.TagInputWrapper>
  );
};

export default TagSelector;
