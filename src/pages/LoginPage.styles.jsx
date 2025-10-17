import styled from "styled-components";
import { Container } from "../styles/Layout";

export const LoginPageWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${({ theme }) => theme.bg};
  max-width: 600px;
  text-align: center;
`;

export const Title = styled.h1`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
`;

export const Paragraph = styled.p`
  color: white;
  font-size: 0.75rem;
  text-align: center;
  margin-top: 1rem;
`;
