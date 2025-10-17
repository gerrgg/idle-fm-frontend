import styled from "styled-components";

export const StaticWrapper = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  background: url(/images/static-${(p) => p.$index}.gif) center/cover no-repeat;
  z-index: 10;
  pointer-events: none;
  opacity: ${(p) => (p.ready ? 0 : 1)};
`;
