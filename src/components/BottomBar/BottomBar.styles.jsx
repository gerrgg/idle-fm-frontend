import styled from "styled-components";

export const Wrapper = styled.footer`
  height: 60px;
  width: 100%;
  position: fixed;
  bottom: 0;
  left: 0;

  background: ${({ theme }) => theme.colors.surface2};
  border-top: 1px solid ${({ theme }) => theme.colors.surface2};

  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;

  z-index: 1100;
`;
