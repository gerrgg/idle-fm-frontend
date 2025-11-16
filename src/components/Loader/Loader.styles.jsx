import styled, { keyframes } from "styled-components";

const spin = keyframes`
  25% {background-position: 0 0   ,100% 100%,100% calc(100% - 5px)}
  50% {background-position: 0 100%,100% 100%,0    calc(100% - 5px)}
  75% {background-position: 0 100%,100%    0,100% 5px}
`;

export const Spinner = styled.div`
  width: 100vw;
  height: 100vh;
  border: 0.5vmin solid ${(props) => props.$fgColor || "#000"};
  padding: 0;
  box-sizing: border-box;
  background: linear-gradient(${(props) => props.$fgColor || "#fff"} 0 0) 0 0/4vmin
      16vmin,
    linear-gradient(${(props) => props.$fgColor || "#fff"} 0 0) 100% 0/4vmin
      16vmin,
    linear-gradient(${(props) => props.$fgColor || "#fff"} 0 0) 0 2vmin/2vmin
      2vmin,
    ${(props) => props.$bgColor || "#000"};
  background-repeat: no-repeat;
  animation: ${spin} 2s infinite linear;
`;
