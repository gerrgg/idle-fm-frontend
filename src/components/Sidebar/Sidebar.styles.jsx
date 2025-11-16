import styled from "styled-components";
import { H1 } from "../../styles/typography.js";

export const Wrapper = styled.aside`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.surface1};
  color: #fff;
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  width: ${({ theme }) => theme.layout.sidebarWidth};
  box-sizing: border-box;
  padding-bottom: ${({ theme }) => theme.layout.bottomBarHeight};
`;

export const LogoText = styled(H1)`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: 31px;
  letter-spacing: 0.1em;
`;
