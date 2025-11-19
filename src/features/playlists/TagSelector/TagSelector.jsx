import { useState, useRef, useEffect } from "react";
import * as S from "./TagSelector.styles.jsx";

export default function TagSelector({
  availableTags = [],
  selectedTags = [],
  onChange,
  autoCommitRef,
}) {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);

  // -----------------------------
  // Auto-commit on form submit
  // -----------------------------
  if (autoCommitRef) {
    autoCommitRef.current = () => {
      if (input.trim()) {
        return addTag({ name: input.trim() });
      }
      return selectedTags;
    };
  }

  // -----------------------------
  // Handle typing
  // -----------------------------
  function handleChange(val) {
    setInput(val);

    const filtered = availableTags.filter(
      (t) =>
        t.name.toLowerCase().includes(val.toLowerCase()) &&
        !selectedTags.some((sel) => sel.id === t.id)
    );

    setSuggestions(filtered.slice(0, 5));
    setHighlightIndex(filtered.length > 0 ? 0 : -1);
  }

  // -----------------------------
  // Keyboard logic
  // -----------------------------
  function handleKeyDown(e) {
    const trimmed = input.trim();

    // ↓ move down
    if (e.key === "ArrowDown" && suggestions.length) {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev + 1 >= suggestions.length ? 0 : prev + 1
      );
      return;
    }

    // ↑ move up
    if (e.key === "ArrowUp" && suggestions.length) {
      e.preventDefault();
      setHighlightIndex((prev) =>
        prev - 1 < 0 ? suggestions.length - 1 : prev - 1
      );
      return;
    }

    // Enter selects highlighted suggestion OR commits freeform tag
    if (e.key === "Enter") {
      e.preventDefault();
      if (highlightIndex >= 0 && suggestions.length) {
        addTag(suggestions[highlightIndex]);
      } else if (trimmed) {
        const existing = availableTags.find(
          (t) => t.name.toLowerCase() === trimmed.toLowerCase()
        );
        addTag(existing || { name: trimmed });
      }
      return;
    }

    // Tab selects highlighted suggestion
    if (e.key === "Tab" && suggestions.length && highlightIndex >= 0) {
      e.preventDefault();
      addTag(suggestions[highlightIndex]);
      return;
    }

    // // Space = commit freeform tag
    // if (e.key === " " && trimmed) {
    //   e.preventDefault();
    //   const existing = availableTags.find(
    //     (t) => t.name.toLowerCase() === trimmed.toLowerCase()
    //   );
    //   addTag(existing || { name: trimmed });
    //   return;
    // }

    // Backspace removes last tag
    if (e.key === "Backspace" && !input && selectedTags.length) {
      removeTag(selectedTags.length - 1);
      return;
    }

    // Escape closes suggestions
    if (e.key === "Escape") {
      setSuggestions([]);
      setHighlightIndex(-1);
    }
  }

  // -----------------------------
  // Add/remove tag helpers
  // -----------------------------
  function addTag(tag) {
    const tagWithId = tag.id
      ? tag
      : { ...tag, id: `temp-${Date.now()}-${Math.random()}` };

    const updated = selectedTags.some((t) => t.id === tagWithId.id)
      ? selectedTags
      : [...selectedTags, tagWithId];

    onChange(updated);
    setInput("");
    setSuggestions([]);
    setHighlightIndex(-1);

    return updated;
  }

  function removeTag(i) {
    const updated = selectedTags.filter((_, idx) => idx !== i);
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
          {suggestions.map((s, i) => (
            <li
              key={s.id}
              onClick={() => addTag(s)}
              style={{
                background:
                  i === highlightIndex
                    ? "rgba(255,255,255,0.1)"
                    : "transparent",
              }}
            >
              {s.name}
            </li>
          ))}
        </S.SuggestionList>
      )}
    </S.TagInputWrapper>
  );
}
