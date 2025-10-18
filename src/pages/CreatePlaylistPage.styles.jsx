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

export const CreatePlaylistTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;
