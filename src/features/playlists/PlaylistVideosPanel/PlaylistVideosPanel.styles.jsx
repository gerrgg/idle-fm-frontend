import styled from "styled-components";

export const PanelWrapper = styled.div`
  padding: ${({ theme }) => theme.space.lg};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};
  background: ${({ theme }) => theme.colors.surface1};
  border-radius: ${({ theme }) => theme.radius.md};
  max-height: 760px;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none; /* IE and Edge */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, and Opera */
  }
`;

export const VideoItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  padding: ${({ theme }) => theme.space.md} 0;
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
`;

export const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.xs};
`;

export const VideoTitle = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text};
  font-family: ${({ theme }) => theme.fonts.body};
`;

export const VideoChannel = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.muted};
  font-family: ${({ theme }) => theme.fonts.body};
`;
