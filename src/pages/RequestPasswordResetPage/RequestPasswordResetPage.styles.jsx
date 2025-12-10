import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.space.lg};
  text-align: center;
  background: ${({ theme }) => theme.colors.bg};
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

  label {
    text-align: left;
  }
`;
export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: ${({ theme }) => theme.space.lg};
`;

export const FooterText = styled.p`
  margin-top: ${({ theme }) => theme.space.lg};
  text-align: center;

  a {
    color: ${({ theme }) => theme.colors.accent};
    text-decoration: none;
  }
`;
