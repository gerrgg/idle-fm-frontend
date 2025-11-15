import styled from "styled-components";
import { H1 } from "../../styles/typography.js";

export const Wrapper = styled.aside`
  width: 240px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  background: #000;
  color: #fff;
  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;
`;

export const Logo = styled.img`
  width: 36px;
  height: auto;
`;

export const LogoText = styled(H1)`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  text-transform: uppercase;
  line-height: 1;
`
