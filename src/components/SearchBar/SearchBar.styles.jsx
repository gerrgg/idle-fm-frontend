import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
  margin: 0 auto;
  display: none;

  background: ${({ theme }) => theme.colors.surface1};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  padding: ${({ theme }) => theme.space.sm} ${({ theme }) => theme.space.md};
  border-radius: ${({ theme }) => theme.radius.full};

  &:focus-within {
    border-color: ${({ theme }) => theme.colors.accent};
  }
`;

export const SearchIcon = styled.div`
  width: 18px;
  height: 18px;
  opacity: 0.8;
  fill: ${({ theme }) => theme.colors.muted};

  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SearchInput = styled.input`
  flex: 1;
  min-width: 325px;
  font-family: ${({ theme }) => theme.fonts.body};
  font-size: ${({ theme }) => theme.fontSizes.base};
  color: ${({ theme }) => theme.colors.text};

  background: transparent;
  border: none;
  outline: none;

  &::placeholder {
    color: ${({ theme }) => theme.colors.muted};
    opacity: 0.7;
  }
`;
