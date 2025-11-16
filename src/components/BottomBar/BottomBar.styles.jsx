import styled from "styled-components";
import { Row } from "../../styles/layout";

export const Wrapper = styled(Row)`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;

  background: ${({ theme }) => theme.colors.surface2};
  border-top: 1px solid ${({ theme }) => theme.colors.surface3};

  padding: 0 ${({ theme }) => theme.space.lg};
  z-index: 1000;

  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
`;

export const Section = styled(Row)`
  align-items: center;
  gap: ${({ theme }) => theme.space.md};
`;

export const Controls = styled(Row)`
  flex: 1;
  justify-content: center;
  gap: ${({ theme }) => theme.space.md};
`;

export const IconButtonCircle = styled.button`
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radius.full};

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ theme }) => theme.colors.surface3};
  border: 1px solid ${({ theme }) => theme.colors.surface3};
  color: ${({ theme }) => theme.colors.text};

  cursor: pointer;
  transition: 0.15s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.accent}33;
    border-color: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

export const IconButton = styled(IconButtonCircle)`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
`
