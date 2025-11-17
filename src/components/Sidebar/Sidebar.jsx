import { useDispatch } from "react-redux";
import { setView } from "../../store/dashboardSlice";

import { Wrapper, LogoText } from "./Sidebar.styles.jsx";
import { Row, Stack } from "../../styles/layout.js";
import { Logo } from "../Logo/index.js";
import { Button } from "../../styles/button.js";

export default function Sidebar() {
  const dispatch = useDispatch();

  return (
    <Wrapper>
      <Row gap="xs" align="flex-end">
        <Logo width="36" height="36" />
        <LogoText>idle.fm</LogoText>
      </Row>
      <Stack gap="md" my="xl">
        <Button
          size="lg"
          variant="outline"
          onClick={() => dispatch(setView("createPlaylist"))}
        >
          Create
        </Button>
      </Stack>
    </Wrapper>
  );
}
