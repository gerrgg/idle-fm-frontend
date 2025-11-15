import { Wrapper, Logo, LogoText } from "./Sidebar.styles.jsx";
import SVG from "../../assets/logo.svg";
import { Row } from "../../styles/layout.js";

export default function Sidebar() {
  return <Wrapper>
    <Row gap="md" align="flex-end">
      <Logo src={SVG} alt="Logo" />
      <LogoText>idle.fm</LogoText>
    </Row>
  </Wrapper>;
}
