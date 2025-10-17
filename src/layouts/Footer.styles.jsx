import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  bottom: 0rem;
  width: 100%;
`;
export const FooterText = styled.p`
  margin: 0;
  padding: 0 0 0.5rem;
  color: ${({ theme }) => theme.muted};
  opacity: 0.7;
  font-size: 0.875rem;
  text-align: center;
`;
