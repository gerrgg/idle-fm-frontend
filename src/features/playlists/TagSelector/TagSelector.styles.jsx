import styled from "styled-components";

export const TagInputWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  position: relative;

  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: ${({ theme }) => theme.radius.md};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;

export const Tag = styled.span`
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.colors.accentAlt};
  color: ${({ theme }) => theme.colors.bg};
  font-size: 0.85rem;
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const RemoveTag = styled.button`
  background: none;
  border: none;
  margin-left: 6px;
  color: ${({ theme }) => theme.colors.bg};
  cursor: pointer;
  font-size: 0.9rem;
`;

export const TagInput = styled.input`
  flex: 1;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSizes.base};
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }
`;

export const SuggestionList = styled.ul`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  right: 0;

  list-style: none;
  margin: 0;
  padding: 0;

  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  z-index: 20;

  li {
    padding: 10px 14px;
    cursor: pointer;
    font-size: ${({ theme }) => theme.fontSizes.base};

    &:hover {
      background: ${({ theme }) => theme.colors.surface3};
    }
  }
`;
