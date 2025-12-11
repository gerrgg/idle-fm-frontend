import styled from "styled-components";
import { H1 } from "../../styles/typography.js";
import { Link } from "react-router-dom";

export const Wrapper = styled.header`
  position: sticky;
  top: 0;
  z-index: 900;
  background: ${({ theme }) => theme.colors.surface2};
  border-bottom: 1px solid ${({ theme }) => theme.colors.surface2};
  backdrop-filter: blur(10px);
  color: ${({ theme }) => theme.text};
  margin-left: ${({ $collapse, theme }) =>
    $collapse ? theme.layout.sidebarWidthCollapse : theme.layout.sidebarWidth};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
`;

export const LogoText = styled(Link)`
  color: ${({ theme }) => theme.colors.text};
  text-decoration: none;
  font-size: 36px;
  cursor: pointer;

  &:hover{
    color: ${({ theme }) => theme.colors.accent};
`;
