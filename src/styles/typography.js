// src/styles/typography.js
import styled, { css } from "styled-components";

const margins = {
  none: "0",
  sm: css`
    ${({ theme }) => theme.space.sm}
  `,
  md: css`
    ${({ theme }) => theme.space.md}
  `,
  lg: css`
    ${({ theme }) => theme.space.lg}
  `,
};

// -----------------------------
// Heading Components (VT323)
// -----------------------------
export const H1 = styled.h1`
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: 1.1;
  margin-bottom: ${({ mb }) => margins[mb] || margins.none};
  margin-top: ${({ mt }) => margins[mt] || margins.none};
  margin-left: ${({ ml }) => margins[ml] || margins.none};
  margin-right: ${({ mr }) => margins[mr] || margins.none};
`;

export const H2 = styled.h2`
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: 1.15;
  margin: 0;
`;

export const H3 = styled.h3`
  font-family: ${({ theme }) => theme.fonts.header};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 1.2;
  margin: 0;
`;

// -----------------------------
// Body Text (IBM Plex Sans)
// -----------------------------
export const Text = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base};
  line-height: 1.55;
  margin: 0;
`;

export const Small = styled.p`
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: 1.45;
  opacity: 0.85;
  margin: 0;
`;

// -----------------------------
// Mono Text (DM Mono)
// -----------------------------
export const Mono = styled.span`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  letter-spacing: -0.01em;
`;

export const MonoBlock = styled.pre`
  font-family: ${({ theme }) => theme.fonts.mono};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  background: rgba(255, 255, 255, 0.05);
  padding: 8px 12px;
  border-radius: 4px;
  overflow-x: auto;
`;
