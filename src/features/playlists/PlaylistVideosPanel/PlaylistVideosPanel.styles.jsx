import styled from "styled-components";
import { Row } from "../../../styles/layout";
import { theme } from "../../../theme";

export const PlaylistPositionTableCell = styled.td`
  width: 75px;

  span {
    width: 100%;
    text-align: center;
    display: block;
  }

  * {
  }

  &.active {
    span {
      display: none;
    }
  }

  button {
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    color: ${({ theme }) => theme.colors.muted};
    display: none;
    width: 100%;
    height: 100%;
    text-align: center;
  }

  div {
    justify-content: center;
  }

  &:hover {
    span {
      display: none;
    }
    div {
      display: none;
    }
    button {
      display: inline;
    }
  }
`;

export const PanelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.surface1};
  border-radius: ${({ theme }) => theme.radius.md};
  max-height: 800px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
  z-index: 1;
  width: 100%;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

export const PlaylistActions = styled(Row)``;

export const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: 0 0 ${({ theme }) => theme.space.md} 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface3};

  &:last-of-type {
    border-bottom: none;
  }
`;

export const VideoThumb = styled.img`
  width: 90px;
  height: 50px;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
  display: inline-block;
`;

export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

export const VideoTitle = styled.div`
  line-height: 1.2;
  max-width: 300px;
  text-align: left;
`;

export const VideoChannel = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 150px;
`;

export const DateWrapper = styled.div`
  width: 100px;
`;

export const PlaylistTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th,
  td {
    padding: ${({ theme }) => theme.space.lg};
    text-align: left;
    border-bottom: 1px solid ${({ theme }) => theme.colors.surface3};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text};
    font-family: ${({ theme }) => theme.fonts.body};
  }

  th {
    font-weight: ${({ theme }) => theme.fontWeights.bold};
    color: ${({ theme }) => theme.colors.text};
  }

  td {
    color: ${({ theme }) => theme.colors.muted};
  }

  tr {
  }
`;
export const PlaylistTableHeader = styled.thead`
  background: ${({ theme }) => theme.colors.surface2};
`;

export const PlaylistTableBody = styled.tbody``;

export const PlaylistTableRow = styled.tr`
  &:hover {
    background: ${({ theme }) => theme.colors.surface3};
  }
`;
