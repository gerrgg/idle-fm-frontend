import styled, { css } from "styled-components";

const sizes = {
  xs: css`
    width: 18px;
    height: 18px;

    svg {
      width: 18px;
      height: 18px;
    }
  `,
  sm: css`
    width: 24px;
    height: 24px;

    svg {
      width: 14px;
      height: 14px;
    }
  `,
  md: css`
    width: 48px;
    height: 48px;

    svg {
      width: 24px;
      height: 24px;
    }
  `,
  lg: css`
    width: 64px;
    height: 64px;

    svg {
      width: 32px;
      height: 32px;
    }

    @media (max-width: 600px) {
      width: 36px;
      height: 36px;

      svg {
        width: 24px;
        height: 24px;
      }
    }
  `,
};

export const IconButtonCircle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.accentAlt};
  border: 1px solid ${({ theme }) => theme.colors.accentAlt};
  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;
  transition: 0.15s ease;

  ${({ size }) => sizes[size || "none"]}

  &:hover {
    transform: scale(1.1);
  }
`;
