import styled from "styled-components";

export const Wrapper = styled.svg`
  .logo-accent {
    fill: ${({ theme }) => theme.colors.accent};
  }
  .logo-accent-alt {
    fill: ${({ theme }) => theme.colors.accentAlt};
  }
  .logo-text {
    fill: ${({ theme }) => theme.colors.text};
  }
  .logo-muted {
    fill: ${({ theme }) => theme.colors.muted};
  }
  .logo-surface {
    fill: ${({ theme }) => theme.colors.surface3};
  }
`;

export const CollapseWrapper = styled(Wrapper)`
  transform: ${({ $collapse }) => ($collapse ? `scale(1)` : `scale(-1)`)};
  opacity: 0.4;
  color: ${({ theme }) => theme.colors.text};

  &:hover {
    opacity: 1;
  }
`;
