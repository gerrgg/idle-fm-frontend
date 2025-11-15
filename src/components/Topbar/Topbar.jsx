import { Wrapper } from "./Topbar.styles.jsx";
import { Row } from "../../styles/layout.js";
import { Button } from "../../styles/button.js";

export default function Topbar() {
  return (
    <Wrapper>
      <Row gap="sm" justify="flex-end" align="center">
        <Button size="lg" variant="solid">Log In</Button>
        <Button size="lg" variant="subtle">Log In</Button>
        <Button size="lg" variant="outline">Log In</Button>
      </Row>
    </Wrapper>
  );
}
