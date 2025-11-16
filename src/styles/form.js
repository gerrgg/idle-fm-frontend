import styled from "styled-components";

export const Input = styled.input`
  width: 100%;
  padding: ${({ theme }) => `${theme.space.sm} ${theme.space.md}`};
  
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base};

  color: ${({ theme }) => theme.colors.text};
  background: ${({ theme }) => theme.colors.surface2};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  border-radius: 6px;

  outline: none;
  transition: 0.15s ease;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.accent};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.accent}33;
  }
`;
