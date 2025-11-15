import styled from "styled-components";

export const Wrapper = styled.main`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  margin-bottom: 60px;
  background: ${({ theme }) => theme.colors.surface0};
  margin-left: ${({ theme }) => theme.layout.sidebarWidth};
`;
