import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background: ${({ theme }) => theme.bg};
`;

// Sidebar is fixed width
export const ContentArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  overflow: hidden; /* prevents double scrollbars */
`;
