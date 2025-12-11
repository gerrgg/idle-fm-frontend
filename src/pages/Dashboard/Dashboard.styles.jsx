import styled from "styled-components";

export const Wrap = styled.div`
  padding-top: ${({ theme }) => theme.space.xl};
  font-family: ${({ theme }) => theme.fonts.body};
  color: ${({ theme }) => theme.colors.text};
  gap: ${({ theme }) => theme.space.xl};
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    padding-top: 0;
  }
`;

export const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.space.xl};
`;
