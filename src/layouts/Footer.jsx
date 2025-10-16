import { Container } from "../styles/Layout";
import { forwardRef } from "react";

const Footer = forwardRef((props, ref) => {
  return <Container ref={ref}>Footer</Container>;
});

export default Footer;
