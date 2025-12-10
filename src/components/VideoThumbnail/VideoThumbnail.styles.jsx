import styled, { css } from "styled-components";

const variants = {
  grid: css`
    width: 75px;
    height: 75px;
  `,
  sidebar: css`
    width: 25px;
    height: 25px;
  `,
};

export const Thumbnail = styled.img`
  width: 75px;
  height: 75px;
  object-fit: cover;
  background: ${({ theme }) => theme.colors.surface3};
  overflow: hidden;
  flex-shrink: 0;

  ${({ variant }) => variants[variant || "none"]}
`;

export const PlaceholderImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.accent};
  opacity: 0.6;
  z-index: 2; /* Keep on top of glow */

  ${({ variant }) => variants[variant || "none"]}

  padding: ${({ variant, theme }) =>
    variant === "sidebar" ? "0px" : `${theme.space.md} ${theme.space.md}`}
`;
