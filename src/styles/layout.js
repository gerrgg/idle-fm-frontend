// src/styles/layout.js
import styled, { css } from "styled-components";

// ------------------------------------
// Shared props helpers
// ------------------------------------
const spacingProps = css`
  ${({ p, theme }) => p && `padding: ${theme.space[p] || p};`}
  ${({ px, theme }) => px && `
      padding-left: ${theme.space[px] || px};
      padding-right: ${theme.space[px] || px};
  `}
  ${({ py, theme }) => py && `
      padding-top: ${theme.space[py] || py};
      padding-bottom: ${theme.space[py] || py};
  `}
  
  ${({ m, theme }) => m && `margin: ${theme.space[m] || m};`}
  ${({ mx, theme }) => mx && `
      margin-left: ${theme.space[mx] || mx};
      margin-right: ${theme.space[mx] || mx};
  `}
  ${({ my, theme }) => my && `
      margin-top: ${theme.space[my] || my};
      margin-bottom: ${theme.space[my] || my};
  `}
`;


const sizeProps = css`
  ${({ w }) => w && `width: ${w};`}
  ${({ h }) => h && `height: ${h};`}
  ${({ maxW }) => maxW && `max-width: ${maxW};`}
  ${({ maxH }) => maxH && `max-height: ${maxH};`}
`;

// ------------------------------------
// FLEX
// ------------------------------------
export const Flex = styled.div`
  display: flex;
  ${({ direction }) => direction && `flex-direction: ${direction};`}
  ${({ align }) => align && `align-items: ${align};`}
  ${({ justify }) => justify && `justify-content: ${justify};`}
  ${({ wrap }) => wrap && `flex-wrap: ${wrap};`}
  ${({ gap, theme }) => gap && `gap: ${theme.space[gap] || gap};`}

  ${spacingProps}
  ${sizeProps}
`;


// Shorthands
export const Row = styled(Flex)`
  flex-direction: row;
`;

export const Col = styled(Flex)`
  flex-direction: column;
`;

// ------------------------------------
// GRID
// ------------------------------------
export const Grid = styled.div`
  display: grid;
  ${({ cols }) => cols && `grid-template-columns: ${cols};`}
  ${({ rows }) => rows && `grid-template-rows: ${rows};`}
  ${({ gap }) => gap && `gap: ${gap};`}

  ${spacingProps}
  ${sizeProps}
`;

// ------------------------------------
// STACK (Vertical)
// ------------------------------------
export const Stack = styled.div`
  display: flex;
  flex-direction: column;
  ${({ gap }) => gap && `gap: ${gap};`}
  
  ${spacingProps}
  ${sizeProps}
`;

// ------------------------------------
// CONTAINER (centered page wrapper)
// ------------------------------------
export const Container = styled.div`
  margin: 0 auto;
  width: 100%;
  ${({ maxW }) => `max-width: ${maxW || "1200px"};`}
  padding: 0 20px;
`;
