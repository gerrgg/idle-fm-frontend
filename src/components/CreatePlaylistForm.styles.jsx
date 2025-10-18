import styled from "styled-components";
import * as S from "./AuthForm.styles.jsx";

export const CreatePlaylistWrapper = styled(S.AuthForm)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;

  & > :nth-child(n + 3) {
    grid-column: 1 / -1;
  }
`;

export const CreatePlaylistFormButton = styled(S.AuthButton)`
  margin-top: 0;
`;

export const AddRemoveButton = styled(S.AuthButton)`
  background: ${({ theme, buttonaction }) =>
    buttonaction === "add" ? theme.accent : theme.danger};
`;
