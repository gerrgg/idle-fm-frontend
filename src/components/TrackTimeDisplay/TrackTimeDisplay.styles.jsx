import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.space.sm};
`;

export const TimeText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-variant-numeric: tabular-nums;
`;

export const DurationText = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.text};
  font-variant-numeric: tabular-nums;
`;

export const ProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background: ${({ theme }) => theme.colors.surface3};
  border-radius: 2px;
  position: relative;
  width: 400px;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${({ progress }) => progress}%;
    background: ${({ theme }) => theme.colors.accent};
    border-radius: 2px;
  }
`;
