import styled from "styled-components";

export const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.muted};
  border-radius: 6px;
  padding: 1rem 1rem;
  position: relative;
`;

export const Tag = styled.span`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.accentAlt};
  color: ${({ theme }) => theme.bg};
  font-size: 0.85rem;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
`;

export const RemoveTag = styled.button`
  background: none;
  border: none;
  margin-left: 0.3rem;
  color: ${({ theme }) => theme.bg};
  cursor: pointer;
  font-size: 0.9rem;
`;

export const TagInput = styled.input`
  flex: 1;
  border: none;
  outline: none;
  font-size: 0.9rem;
  background: transparent;
  color: ${({ theme }) => theme.text};
`;

export const SuggestionList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.muted};
  border-radius: 6px;
  margin-top: 0.25rem;
  list-style: none;
  padding: 0;
  z-index: 5;

  li {
    padding: 0.5rem;
    cursor: pointer;

    &:hover {
      background: ${({ theme }) => theme.accentAlt}22;
    }
  }
`;
