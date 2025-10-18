import styled from "styled-components";
import { AuthWrapper } from "../pages/AuthPage.styles.jsx";

export const CreatePlaylistWrapper = styled(AuthWrapper)`
  max-width: 100%;
  text-align: left;
`;

export const CreatePlaylistFormWrapper = styled.div`
  width: 100%;
`;

export const CreatePlaylistVideosWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  // width: 30%;
`;

export const CreatePlaylistTitle = styled.h1.attrs((props) => ({
  as: props.level || "h1",
}))`
  font-size: ${({ level }) =>
    level === "h1"
      ? "2rem"
      : level === "h2"
      ? "1.5rem"
      : level === "h3"
      ? "1.25rem"
      : "1rem"};
  margin-bottom: 1.5rem;
  font-weight: 700;
`;

export const CreatePlaylistSection = styled.div`
  width: 100%;
`;

export const CreatePlaylistDivider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.muted || "#e5e7eb"};
  margin: 4rem 0;
`;
