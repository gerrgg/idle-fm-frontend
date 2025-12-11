import styled from "styled-components";
import { Row } from "../../styles/layout";
import { Text } from "../../styles/typography";

export const Wrapper = styled(Row)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;

  background: ${({ theme }) => theme.colors.surface2};
  border-top: 1px solid ${({ theme }) => theme.colors.surface3};

  padding: 0 ${({ theme }) => theme.space.lg};
  z-index: 1000;

  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;

  @media (max-width: 900px) {
    flex-direction: column;
    height: auto;
    padding: ${({ theme }) => theme.space.md};
    gap: ${({ theme }) => theme.space.lg};
  }
`;

export const NowPlaying = styled(Text)`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  line-height: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media (max-width: 900px) {
    line-height: 1;
  }
`;

export const Section = styled(Row)`
  align-items: ${({ align }) => align || "center"};
  gap: ${({ theme }) => theme.space.md};

  @media (max-width: 900px) {
    &.volume-wrapper {
      display: none;
    }
  }
`;

export const MiddleControlsWrapper = styled(Section)`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  flex-direction: column-reverse;
  gap: ${({ theme }) => theme.space.sm};
  max-width: 600px;

  @media (max-width: 900px) {
    position: static;
    transform: none;
    max-width: none;
    order: 2;
    width: 100%;
    justify-content: center;
    align-items: center;
  }
`;

export const LeftControls = styled(Section)`
  width: 300px;

  @media (max-width: 900px) {
    width: 100%;
    justify-content: center;
    order: 1;
  }
`;

export const RightControls = styled(Section)`
  width: 300px;
`;

export const Controls = styled(Row)`
  flex: 1;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};

  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};

  @media (max-width: 900px) {
    gap: ${({ theme }) => theme.space.lg};
  }
`;

export const IconButtonCircle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.surface3};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;
  transition: 0.15s ease;

  @media (max-width: 900px) {
    width: 50px;
    height: 50px;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.accent}33;
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const IconButton = styled(IconButtonCircle)`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
`;
