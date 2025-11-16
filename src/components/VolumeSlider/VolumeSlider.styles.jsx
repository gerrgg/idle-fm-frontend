import styled from "styled-components";

export const VolumeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  width: 160px;
`;

export const VolumeIcon = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.7;

  display: flex;
  align-items: center;

  &:hover {
    opacity: 1;
  }
`;

export const SliderContainer = styled.div`
  position: relative;
  flex: 1;
  height: 6px;
  cursor: pointer;

  /* Base appearance */
  --track-bg: ${({ theme }) => theme.colors.surface3};
  --fill-bg: ${({ theme }) => theme.colors.accent};
  --thumb-bg: ${({ theme }) => theme.colors.text};
  --thumb-size: 10px;
  --thumb-opacity: 0;

  /* Hover behavior */
  &:hover {
    --track-bg: ${({ theme }) => theme.colors.surface3};
    --fill-bg: ${({ theme }) => theme.colors.accent};
    --thumb-size: 14px;
    --thumb-opacity: 1;
  }
`;

export const SliderTrack = styled.div`
  background: var(--track-bg);
  height: 6px;
  border-radius: ${({ theme }) => theme.radius.full};
  position: relative;
  width: 100%;
`;

export const SliderFill = styled.div`
  background: var(--fill-bg);
  height: 100%;
  width: ${({ value }) => `${value * 100}%`};
  border-radius: ${({ theme }) => theme.radius.full};
  transition: all 0.2s ease;
`;

export const SliderThumb = styled.div`
  position: absolute;
  top: 50%;
  left: ${({ value }) => `${value * 100}%`};
  transform: translate(-50%, -50%);
  width: var(--thumb-size);
  height: var(--thumb-size);

  background: var(--thumb-bg);
  border-radius: ${({ theme }) => theme.radius.full};
  opacity: var(--thumb-opacity);

  transition: 0.1s ease;
  pointer-events: none; /* Let the container handle drag */
`;
