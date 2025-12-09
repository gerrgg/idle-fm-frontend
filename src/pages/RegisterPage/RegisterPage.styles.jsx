import styled from "styled-components";

export const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.bg};
  padding: ${({ theme }) => theme.space.lg};
`;

export const Card = styled.form`
  background: ${({ theme }) => theme.colors.surface1};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: ${({ theme }) => theme.radius.lg};

  padding: ${({ theme }) => theme.space.xl};
  width: 100%;
  max-width: 420px;

  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.space.md};

  box-shadow: 0 0 22px rgba(0, 0, 0, 0.25);
`;

export const Title = styled.h1`
  margin: 0 0 ${({ theme }) => theme.space.md} 0;
  text-align: center;

  font-family: ${({ theme }) => theme.fonts.header};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
`;

export const ErrorText = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.danger};
`;

export const FooterText = styled.p`
  margin-top: ${({ theme }) => theme.space.sm};
  text-align: center;
  opacity: 0.75;

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
