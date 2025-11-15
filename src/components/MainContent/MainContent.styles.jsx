import styled from "styled-components";

export const Wrapper = styled.main`
  flex: 1;
  overflow-y: auto;

  padding: 20px;

  /* Push content right so it doesn't hide behind sidebar */
  margin-left: 240px;

  /* Push content up so it doesn't hide behind bottom bar */
  margin-bottom: 60px;
`;
