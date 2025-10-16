import styled from "styled-components";

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.5rem;
  background: ${({ theme }) => theme.bg};
`;

export const Logo = styled.img`
  width: 100px;
  height: auto;
`;
