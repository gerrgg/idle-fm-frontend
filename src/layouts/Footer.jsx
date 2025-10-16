import { Container } from "../styles/Layout";
import { forwardRef } from "react";
import * as S from "./Footer.styles.jsx";

const Footer = forwardRef((props, ref) => {
  return (
    <S.FooterWrapper ref={ref}>
      <S.FooterText>You’re never really offline with Idle.fm.</S.FooterText>
    </S.FooterWrapper>
  );
});

export default Footer;
