import styled from 'styled-components';

export const GifWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  border: 0;
  background: url(${(props) => props.file}) center/cover no-repeat;
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    background: rgba(0, 0, 0, 0.3);
    width: 100%;
    height: 100%;
  }
`

