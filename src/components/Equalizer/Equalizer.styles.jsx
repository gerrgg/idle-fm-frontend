import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%   { transform: scaleY(0.3); }
  20%  { transform: scaleY(1); }
  40%  { transform: scaleY(0.5); }
  60%  { transform: scaleY(0.9); }
  80%  { transform: scaleY(0.4); }
  100% { transform: scaleY(0.3); }
`;

export const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 4px;
  height: ${({ height }) => height || "20px"};
  position: relative;
  top: -2px;
`;

export const Bar = styled.div`
  height: 100%;
  width: 4px;
  background: ${({ theme }) => theme.colors.accent};
  border-radius: ${({ theme }) => theme.radius.full};
  transform-origin: bottom;
  transform: scaleY(0.3);

  animation: ${bounce} 1s ease-in-out infinite;
  animation-play-state: ${({ $isPlaying }) =>
    $isPlaying ? "running" : "paused"};

  /* Each bar slightly different timing for musical effect */
  &:nth-child(1) {
    animation-delay: 0ms;
  }
  &:nth-child(2) {
    animation-delay: 150ms;
  }
  &:nth-child(3) {
    animation-delay: 300ms;
  }
  &:nth-child(4) {
    animation-delay: 450ms;
  }
`;
