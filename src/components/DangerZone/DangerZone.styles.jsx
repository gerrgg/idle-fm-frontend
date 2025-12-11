import styled from "styled-components";

import { Col, Row } from "../../styles/layout";
import { H1 } from "../../styles/typography";
import { Button } from "../../styles/button.js";

export const DangerHeader = styled(H1)`
  margin: ${({ theme }) => theme.space.lg} 0;
  padding: 0 ${({ theme }) => theme.space.lg};
  color: ${({ theme }) => theme.colors.danger};
`;

export const Wrapper = styled(Col)`
  margin-top: ${({ theme }) => theme.space.md};
  border: 1px solid ${({ theme }) => theme.colors.danger};
  border-radius: ${({ theme }) => theme.radius.sm};
  background-color: ${({ theme }) => theme.colors.surface2};
  max-width: 900px;

  @media (max-width: 700px) {
    padding: ${({ theme }) => theme.space.sm};
  }
`;

export const DangerRow = styled(Row)`
  justify-content: space-between;
  align-items: flex-end;
  gap: ${({ theme }) => theme.space.sm};
  padding: ${({ theme }) => theme.space.lg} ${({ theme }) => theme.space.lg};
  background: ${({ theme }) => theme.colors.surface3};

  &:nth-of-type(2) {
    background: ${({ theme }) => theme.colors.surface2};
  }

  @media (max-width: 700px) {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.space.md};
    padding: ${({ theme }) => theme.space.md};
  }
`;

export const ActionButton = styled(Button)`
  flex-shrink: 0;
  margin-left: auto;

  @media (max-width: 700px) {
    margin-left: 0;
    width: 100%;
    text-align: center;
  }
`;

export const VisibilityText = styled.strong`
  color: ${({ theme }) => theme.colors.danger};
  font-style: italic;
`;

export const DangerLabel = styled.div``;
