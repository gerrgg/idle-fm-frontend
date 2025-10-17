import styled from "styled-components";

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  z-index: 10;
  width: 100%;
  gap: 1rem;
`;

export const AuthFormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
`;

export const AuthInput = styled.input`
  padding: 1rem 1rem;
  border: 1px solid ${({ theme }) => theme.muted};
  border-radius: 4px;
  width: 100%;
  box-sizing: border-box;

  background: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.text};
  
  &:focus {
    border-color: ${({ theme }) => theme.accent};
    outline: none;
  }
`;

export const AuthButton = styled.button`
  padding: 1rem 0.5rem;
  background-color: ${({ theme }) => theme.accent};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1rem;
  font-size: 1rem;

  &:hover {
    background-color: ${({ theme }) => theme.accentAlt};
  }
`;

export const AuthLabel = styled.label`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 0.25rem;
  text-align: left;
  display: block;
  width: 100%;
`;

