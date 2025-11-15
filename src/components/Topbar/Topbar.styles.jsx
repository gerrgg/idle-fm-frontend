import styled from "styled-components";

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 900;
  background: ${({ theme }) => theme.colors.surface2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface2};
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text};
  margin-left: ${({ theme }) => theme.layout.sidebarWidth};
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
`;
