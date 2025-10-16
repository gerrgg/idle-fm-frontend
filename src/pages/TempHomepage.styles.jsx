// TempHomePage.styles.jsx
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 3rem 1rem;
  gap: 1.5rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
`;

export const StatusText = styled.p`
  font-size: 1rem;
  color: ${({ theme }) => theme.textMuted || "#9ca3af"};
  margin: 0;
`;

export const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;

  button {
    background: ${({ theme }) => theme.accent};
    color: #fff;
    border: none;
    border-radius: 6px;
    padding: 0.6rem 1.2rem;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
      opacity: 0.85;
    }
  }
`;
