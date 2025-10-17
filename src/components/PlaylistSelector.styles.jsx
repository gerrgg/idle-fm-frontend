import styled from "styled-components";

export const PlaylistSelectorWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px 0;
`;

export const PlaylistSelectorLabel = styled.label`
  margin-bottom: 10px;
  font-size: 1.2em;
  color: ${({ theme }) => theme.accentAlt};
`;

export const PlaylistSelectorSelect = styled.select`
  padding: 10px;
  font-size: 1em;
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.muted};
  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.accentAlt};
  }
`;

export const PlaylistSelectorOption = styled.option`
  padding: 10px;
  font-size: 1em;
  color: #333;
`;
