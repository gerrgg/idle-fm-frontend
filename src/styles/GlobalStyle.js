// styles/GlobalStyle.js
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after { box-sizing: border-box; }
  body {
    margin: 0;
    font-family: 'Press Start 2P', sans-serif;
    line-height: 1.5;
    color: ${({ theme }) => theme.text};
    background: ${({ theme }) => theme.bg};
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0 0 0.5em;
    font-weight: 700;
    line-height: 1.2;
  }

  h1 { font-size: 2.25rem; }
  h2 { font-size: 1.75rem; }
  h3 { font-size: 1.5rem; }
  h4 { font-size: 1.25rem; }
  h5 { font-size: 1.1rem; }
  h6 { font-size: 1rem; }

  p {
    margin: 0 0 1em;
    font-size: 1rem;
  }

  a {
    color: ${({ theme }) => theme.accent};
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  button {
    font-family: inherit;
    font-size: 1rem;
    cursor: pointer;
  }
`;
