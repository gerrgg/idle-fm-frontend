import styled from "styled-components";

export const FooterWrapper = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const FooterText = styled.p`
  margin: 0;
  padding: 0;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 0.875rem;
  text-align: center;
`;
