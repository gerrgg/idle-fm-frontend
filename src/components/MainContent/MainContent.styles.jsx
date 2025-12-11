import styled from "styled-components";

export const Wrapper = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: ${({ theme }) => theme.space.lg};
  margin-bottom: ${({ theme }) => theme.layout.bottomBarHeight};
  background: ${({ theme }) => theme.colors.surface0};
  margin-left: ${({ $collapse, theme }) =>
    $collapse ? theme.layout.sidebarWidthCollapse : theme.layout.sidebarWidth};

  @media (max-width: 900px) {
    padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.md};
    margin-bottom: ${({ theme }) => theme.layout.bottomBarMobile};
  }
`;
