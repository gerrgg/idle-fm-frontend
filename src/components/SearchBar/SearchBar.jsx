import { Wrapper, SearchIcon, SearchInput } from "./SearchBar.styles";

export default function SearchBar({ value, onChange, placeholder = "Search..." }) {
  return (
    <Wrapper>
      <SearchIcon>
        <svg width="16" height="16" viewBox="0 0 24 24">
          <path
            d="M10 2a8 8 0 015.292 13.708l4 4a1 1 0 01-1.414 1.414l-4-4A8 8 0 1110 2zm0 2a6 6 0 100 12A6 6 0 0010 4z"
            fill="currentColor"
          />
        </svg>
      </SearchIcon>

      <SearchInput
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </Wrapper>
  );
}
