// src/styles/button.js
import styled, { css } from "styled-components";

//
// SIZE TOKENS
//
const sizes = {
  sm: css`
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
    font-size: ${({ theme }) => theme.fontSizes.base};
  `,
  lg: css`
    padding: ${({ theme }) => `${theme.space.md} ${theme.space.lg}`};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
};

//
// VARIANT TOKENS
// (Customize freely)
//
const variants = {
  solid: css`
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.bg};
    border: none;

    &:hover {
      background: ${({ theme }) => theme.colors.accentAlt};
    }
  `,
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.accent};
    border: 1px solid ${({ theme }) => theme.colors.accent};

    &:hover {
      background: rgba(255, 255, 255, 0.05);
    }
  `,
  subtle: css`
    background: rgba(255, 255, 255, 0.06);
    color: ${({ theme }) => theme.colors.text};
    border: none;

    &:hover {
      background: rgba(255, 255, 255, 0.1);
    }
  `,
  sidebarItem: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};
    font-family: ${({ theme }) => theme.fonts.body};
    text-transform: none;
    font-weight: ${({ theme }) => theme.fontWeights.regular};
    justify-content: flex-start;
    padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
    text-align: left;
    line-height: 1.2;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    display: block;

    &:hover {
      background: rgba(255, 255, 255, 0.08);
    }

    &.active {
      background: rgba(255, 255, 255, 0.12);
      font-weight: ${({ theme }) => theme.fontWeights.bold};
      color: ${({ theme }) => theme.colors.accent};
    }

    ${({ $isActive, theme }) =>
      $isActive &&
      css`
        font-weight: ${theme.fontWeights.bold};
        color: ${theme.colors.accent};
      `}

    ${({ $isViewing }) =>
      $isViewing &&
      css`
        background: rgba(255, 255, 255, 0.12);
      `}
  `,
  danger: css`
    background: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.bg};
    border: none;
    border-radius: ${({ theme }) => theme.radius.sm};

    &:hover {
      background: ${({ theme }) => theme.colors.dangerAlt};
    }
  `,
};

//
// BASE BUTTON
//
export const Button = styled.button`
  cursor: pointer;
  border-radius: ${({ theme }) => theme.radius.md};
  font-family: ${({ theme }) => theme.fonts.header};
  text-transform: uppercase;
  letter-spacing: 0.1em;
  line-height: 0.8;
  transition: 0.15s ease;
  // text-transform: uppercase;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  border-radius: 36px;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.space.xs};

  // variant
  ${({ variant }) => variants[variant || "solid"]}

  // size
  ${({ size }) => sizes[size || "md"]}

  // disabled state
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      pointer-events: none;
    `}
`;
