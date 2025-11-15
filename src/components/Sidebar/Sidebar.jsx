import { Wrapper, LogoText } from "./Sidebar.styles.jsx";
import { Row, Stack } from "../../styles/layout.js";
import {Logo} from "../Logo/index.js";

export default function Sidebar() {
  return <Wrapper>
    <Row gap="md" align="flex-end">
      <Logo width="36" height="36" />
      <LogoText>idle.fm</LogoText>
    </Row>
  </Wrapper>;
}
