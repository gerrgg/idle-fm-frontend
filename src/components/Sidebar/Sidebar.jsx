import { Wrapper, LogoText } from "./Sidebar.styles.jsx";
import { Row, Stack } from "../../styles/layout.js";
import {Logo} from "../Logo/index.js";
import { Button } from "../../styles/button.js";

export default function Sidebar() {
  return <Wrapper>
    <Row gap="xs" align="flex-end">
      <Logo width="36" height="36" />
      <LogoText>idle.fm</LogoText>
    </Row>
    <Stack gap="md" my="xl">
      <Button size="lg" variant="outline">Create</Button>
    </Stack>
  </Wrapper>;
}
