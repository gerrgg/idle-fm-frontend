import styled from "styled-components";
import Equalizer from "../Equalizer/Equalizer";

export const Wrap = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.space.lg};
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.surface1};
  border-radius: ${({ theme }) => theme.radius.lg};
  cursor: pointer;
  transition: 0.2s ease;
  border: 1px solid transparent;
  display: flex;
  border-radius: ${({ theme }) => theme.radius.md};
  overflow: hidden;
  align-items: center;

  &:hover {
    background: ${({ theme }) => theme.colors.surface2};
    border-color: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
  }
`;

export const CardInfo = styled.div`
  padding: ${({ theme }) => theme.space.md};
  padding-right: 60px;
  position: relative;
  width: 100%;
`;

export const Thumbnail = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.surface3};
  overflow: hidden;
  flex-shrink: 0;
`;

export const Title = styled.h3`
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  margin: 0 0 ${({ theme }) => theme.space.xs};
  color: ${({ theme }) => theme.colors.text};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
`;

export const Count = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  opacity: 0.7;
  color: ${({ theme }) => theme.colors.muted};
`;

export const Username = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.accentAlt};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  opacity: 0.7;
`;

export const IconButtonCircle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.surface1};

  opacity: 0;
  transition: opacity 0.2s ease;

  ${Card}:hover & {
    opacity: 1;
    cursor: pointer;
  }
`;

export const CardInfoHoverWrapper = styled.div`
  position: absolute;
  right: ${({ theme }) => theme.space.md};
  top: 50%;
  transform: translateY(-50%);
  width: 40px;
  height: 40px;

  > button,
  > div {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  > button {
    opacity: 0;
  }
`;

export const EqualizerWrapper = styled(Equalizer)`
  opacity: 1;
  transition: opacity 0.2s ease;
  pointer-events: none;

  ${Card}:hover & {
    opacity: 0;
  }
`;
