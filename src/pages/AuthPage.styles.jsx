import styled from "styled-components";
import { Container } from "../styles/Layout";
import { Link as RouterLink } from "react-router-dom";

export const AuthWrapper = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: ${({ theme }) => theme.bg};
  max-width: 500px;
  text-align: center;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border: 1px solid ${({ theme }) => theme.muted};
`;

export const AuthTitle = styled.h1`
  margin-bottom: 2rem;
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
`;

export const AuthParagraph = styled.p`
  font-size: 0.75rem;
  margin-top: 1rem;
  text-align: center;
  color: ${({ theme }) => theme.muted};
`;

export const AuthLink = styled(RouterLink)`
  color: ${({ theme }) => theme.muted};
  text-decoration: none;
  font-size: 0.6rem;
  margin: 0.25rem 0;
  display: block;
  width: 100%;
  text-align: left;

  &:hover {
    text-decoration: underline;
  }
`;
