import styled from "styled-components";
import { H1 } from "../../styles/typography.js";

export const Wrapper = styled.aside`
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: ${({ theme }) => theme.colors.surface1};
  color: #fff;
  padding: ${({ theme }) => theme.space.md} ${({ theme }) => theme.space.xl};
  display: flex;
  flex-direction: column;
  z-index: 1000;
  width: ${({ theme }) => theme.layout.sidebarWidth};
  box-sizing: border-box;
`;


export const LogoText = styled(H1)`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  text-transform: uppercase;
  line-height: 31px;
`
