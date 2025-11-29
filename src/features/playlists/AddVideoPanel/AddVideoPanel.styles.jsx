import styled from "styled-components";
import { Input } from "../../../styles/form";

export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  position: relative;
  z-index: 2;
  background: ${({ theme }) => theme.colors.surface1};
  padding: ${({ theme }) => theme.space.lg};
  border-radius: 10px;
  max-width: 480px;
`;

export const SearchBar = styled.input`
  width: 100%;
  padding: 12px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  background: ${({ theme }) => theme.colors.surface2};
  color: ${({ theme }) => theme.colors.text};
  font-size: 0.9rem;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    outline: none;
  }
`;

export const SuggestionsBox = styled.ul`
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: ${({ theme }) => theme.radius.md};
  margin-top: 4px;
  overflow: hidden;
`;

export const SuggestionItem = styled.li`
  padding: 10px 14px;
  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.surface3};
  }
`;

export const PlaceholderMessage = styled.div`
  opacity: 0.5;
  text-align: center;
  margin-top: 20px;
`;

export const ResultsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const ResultItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const ThumbnailWrapper = styled.div`
  position: relative;
  cursor: pointer;

  &:hover,
  &.active {
    &::after {
      opacity: 1;
    }
  }

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.3);
    border-radius: ${({ theme }) => theme.radius.md};
    transition: opacity 0.2s ease;
    opacity: 0;
  }
`;

export const Icon = styled.svg`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  fill: ${({ theme }) => theme.colors.accent};
  z-index: 1;
  opacity: 0;

  ${ThumbnailWrapper}:hover & {
    opacity: 1;
  }

  ${ThumbnailWrapper}.active & {
    opacity: 1;
  }
`;

export const Thumbnail = styled.img`
  width: 120px;
  height: 67px;
  object-fit: cover;
  border-radius: 4px;
  aspect-ratio: 16/9;
`;

export const ResultTitle = styled.div`
  flex: 1;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.colors.text};
`;

export const AddButton = styled.button`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.textOnAccent};
  border: none;
  padding: 8px 14px;
  border-radius: ${({ theme }) => theme.radius.md};
  cursor: pointer;
  white-space: nowrap;

  &:hover {
    background: ${({ theme }) => theme.colors.accentAlt};
  }
`;

export const SearchInput = styled(Input)`
  padding-right: 14px;
`;
