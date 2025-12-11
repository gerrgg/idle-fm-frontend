import styled from "styled-components";
import { H1 } from "../../styles/typography.js";
import { Row, Col } from "../../styles/layout.js";
import { Button } from "../../styles/button.js";
import { Stack } from "../../styles/layout.js";
import VideoThumbnail from "../VideoThumbnail/VideoThumbnail.jsx";
import { CollapseWrapper } from "../Logo/Logo.styles.jsx";

export const SidebarThumbnail = styled(VideoThumbnail)`
  padding: 0 !important;
`;

export const LogoText = styled(H1)`
  font-size: ${({ theme }) => theme.fontSizes.xxl};
  line-height: 31px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

export const ButtonWrapper = styled.div`
  cursor: pointer;
  position: relative;
  padding: 2px 4px;
  display: flex;
  align-items: center;
  justify-content: center;

  &::after {
    border-radius: 8px;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    content: "";
    z-index: -1;
    opacity: 0;
  }

  &:hover::after {
    opacity: 0.1;
  }
`;

export const LogoWrapper = styled(Row)`
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  justify-content: center;

  &:hover {
  }
`;

export const SidebarList = styled(Col)`
  flex: 1;
  min-height: 0; /* prevents flex item from overflowing */
  overflow-y: auto;
  margin-bottom: 0;

  /* Hide scrollbar but keep scroll functionality */
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE + Edge */
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
  flex-shrink: 0;

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

export const SidebarStack = styled(Stack)`
  flex: 1;
  min-height: 0;
`;

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

  @media (max-width: 900px) {
    padding-bottom: ${({ theme }) =>
      theme.layout.bottomBarMobileSideBarPadding};
    margin-bottom: 12px;
  }

  &.collapse {
    width: ${({ theme }) => theme.layout.sidebarWidthCollapse};
    padding-top: 0;
    padding-left: 4px;
    padding-right: 4px;

    .logo-collapse-wrapper {
      position: relative;
      height: ${({ theme }) => theme.layout.topbarHeight};
      cursor: pointer;

      &:hover {
        .collapse-icon {
          opacity: 1;
        }

        .logo-wrapper {
          opacity: 0;
        }
      }
    }

    ${ButtonWrapper} {
      position: absolute;
      left: 50%;
      top: 10px;
      transform: translate(-50%);
    }

    .collapse-icon {
      opacity: 0;
    }

    button[variant="outline"] {
      // display: none;
      border-radius: 0;
      background: ${({ theme }) => theme.colors.surface4};
      border-color: ${({ theme }) => theme.colors.surface4};
      color: ${({ theme }) => theme.colors.text};
      padding: ${({ theme }) => theme.space.md};
      font-size: 0;
      height: auto;
      width: 41px;
      margin: 0 auto;
      aspect-ratio: 1;
      opacity: 1;
      position: relative;

      &::after {
        background: url("data:image/svg+xml,%3Csvg clip-rule='evenodd' fill-rule='evenodd' stroke-linejoin='round' stroke-miterlimit='2' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='m11 11h-7.25c-.414 0-.75.336-.75.75s.336.75.75.75h7.25v7.25c0 .414.336.75.75.75s.75-.336.75-.75v-7.25h7.25c.414 0 .75-.336.75-.75s-.336-.75-.75-.75h-7.25v-7.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75z' fill='white' fill-rule='nonzero'/%3E%3C/svg%3E")
          center/contain no-repeat;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 24px;
        height: 24px;
        content: "";
        z-index: 1;
      }

      &:hover {
        opacity: 1;
      }
    }

    ${SidebarStack} {
      margin: 0;
      // flex-direction: column-reverse;
    }

    ${SidebarList} {
      margin-top: ${({ theme }) => theme.space.sm};
      gap: 0px;
    }

    ${SidebarItem} {
      font-size: 0;
      margin: 0;
      img {
        height: auto;
        width: 100%;
        aspect-ratio: 1;
      }
    }
  }
`;
