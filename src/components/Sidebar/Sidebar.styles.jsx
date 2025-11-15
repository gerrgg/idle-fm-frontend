import styled from "styled-components";

export const Wrapper = styled.aside`
  width: 240px;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

  background: #000;
  color: #fff;

  padding: 20px;
  display: flex;
  flex-direction: column;
  z-index: 1000;

  nav {
    margin-top: 30px;
    display: flex;
    flex-direction: column;
    gap: 16px;

    a {
      color: #b3b3b3;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.2s;

      &:hover {
        color: #fff;
      }
    }
  }
`;
