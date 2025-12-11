import styled from "styled-components";
import { Row } from "../../../styles/layout";
import { theme } from "../../../theme";

export const PlaylistPositionTableCell = styled.td`
  width: 75px;
  flex-shrink: 0;

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
  -ms-overflow-style: none; /* IE and Edge */
  z-index: 1;
  width: 100%;

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

export const PlaylistActions = styled(Row)`
  justify-content: space-between;
`;

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
  cursor: pointer;

  &:hover {
  }
`;

export const ThumbWrapper = styled.div`
  position: relative;
  display: inline-block;

  &:hover .set-image-overlay {
    opacity: 1;
    visibility: visible;
    transform: translateY(0px);
  }
`;

export const SetImageOverlay = styled.div`
  position: absolute;
  top: 4px;
  right: 4px;
  background: rgba(0, 0, 0, 0.65);
  padding: 4px;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  opacity: 0;
  visibility: hidden;
  transition: all 0.2s ease;
  transform: translateY(-4px);

  display: flex;
  align-items: center;
  gap: 4px;

  svg {
    width: 14px;
    height: 14px;
  }
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

  color: ${({ $isActive }) =>
    $isActive ? theme.colors.accent : theme.colors.muted};
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

  @media (max-width: 900px) {
    display: none;
  }

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

export const DragHandleWrapper = styled.td`
  padding: 0 0 0 ${({ theme }) => theme.space.md} !important;
  cursor: grab;
  width: 20px;
  opacity: 0.8;
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.muted};
  opacity: 0.3;

  &:hover {
    opacity: 1;
  }

  svg {
    color: ${({ theme }) => theme.colors.muted};
    path {
      color: ${({ theme }) => theme.colors.muted};
    }
  }
`;

export const MobileVideoItem = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    width: 100%;
    padding: ${({ theme }) => theme.space.md};
    border-bottom: 1px solid ${({ theme }) => theme.colors.surface3};
  }
  overflow: hidden;
`;

export const MobileRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  width: 100%;
`;

export const MobileThumb = styled.img`
  width: 90px;
  height: 100%;
  object-fit: cover;
  border-radius: ${({ theme }) => theme.radius.sm};
`;

export const MobileInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

export const MobileTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-weight: 600;
  color: ${({ $isActive, theme }) =>
    $isActive ? theme.colors.accent : theme.colors.text};
  margin-bottom: 4px;
  max-height: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const MobileMeta = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
`;

export const MobileRemoveButton = styled.button`
  background: none;
  border: none;
  color: ${({ theme }) => theme.colors.muted};
  font-size: 22px;
  cursor: pointer;
`;

export const MobileListWrapper = styled.div`
  display: none;

  @media (max-width: 900px) {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.space.md};
  }
`;
