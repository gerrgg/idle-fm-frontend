// src/styles/GlobalStyles.jsx
import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

  body {
    margin: 0;
    padding: 0;
    background: #121212;
    color: #fff;
    font-family: ${({ theme }) => theme.fonts.body};
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${({ theme }) => theme.fonts.header};
    font-weight: 400;
  }

  code, pre, .mono {
    font-family: ${({ theme }) => theme.fonts.mono};
  }

  *{
    box-sizing: border-box;
  }
`;
