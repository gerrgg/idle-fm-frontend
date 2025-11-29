import styled from "styled-components";
import { H1 } from "../../styles/typography.js";
import { Row } from "../../styles/layout.js";
import { Button } from "../../styles/button.js";

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

export const LogoWrapper = styled(Row)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  justify-content: center;
`;

export const SidebarItem = styled(Button)`
  background: transparent;
  color: ${({ theme }) => theme.colors.text};
  border: none;
  border-radius: ${({ theme }) => theme.radius.sm};
  font-family: ${({ theme }) => theme.fonts.body};
  text-transform: none;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  justify-content: flex-start;
  padding: ${({ theme }) => `${theme.space.xs} ${theme.space.sm}`};
  text-align: left;
  line-height: 1.2;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: block;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
  margin-bottom: ${({ theme }) => theme.space.xs};

  &:hover {
    background: rgba(255, 255, 255, 0.08);
  }

  &.active {
    color: ${({ theme }) => theme.colors.accentAlt};
  }
`;

export const Thumbnail = styled.img`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radius.sm};
  object-fit: cover;
`;
