import styled from "styled-components";

export const LinesWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url(images/lines.jpg);
  background-size: auto;
  z-index: 10;
  background-size: 7px auto;
  mix-blend-mode: overlay;
  pointer-events: none;
  opacity: 0.3;

  @keyframes moveDownAnimation {
    0% {
      background-position-y: 0px;
    }
    100% {
      background-position-y: 100%;
    }
  }
  animation: moveDownAnimation 150s linear infinite;
`;
