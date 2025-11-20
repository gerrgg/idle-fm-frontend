import styled from "styled-components";

export const Wrap = styled.div`
  padding: ${({ theme }) => theme.space.xl};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
`;
