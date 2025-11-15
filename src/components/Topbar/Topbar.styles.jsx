import styled from "styled-components";

export const Wrapper = styled.header`
  height: 60px;
  position: sticky;
  top: 0;
  z-index: 900;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 20px;

  background: rgba(18, 18, 18, 0.9);
  backdrop-filter: blur(10px);

  color: ${({ theme }) => theme.text};
`;
