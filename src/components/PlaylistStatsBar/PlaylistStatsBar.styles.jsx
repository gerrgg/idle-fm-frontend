// src/components/Playlist/PlaylistStatsBar.styles.js
import styled from "styled-components";

export const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.lg};
  padding: ${({ theme }) => theme.space.sm} 0;
  color: ${({ theme }) => theme.colors.textMuted};
  font-size: ${({ theme }) => theme.fontSizes.md};
`;

export const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.xs};
`;

export const StatNumber = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text};
`;

export const LikeButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  color: ${({ theme, liked }) =>
    liked ? theme.colors.accent : theme.colors.text};

  transition: transform 0.15s ease, color 0.2s ease;

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.accent};
  }

  &:active {
    transform: scale(0.9);
  }
`;

export const ShareButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  padding: 2px;
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.text};

  transition: transform 0.15s ease;

  &:hover {
    transform: scale(1.1);
    color: ${({ theme }) => theme.colors.accent};
  }

  &:active {
    transform: scale(0.9);
  }
`;
