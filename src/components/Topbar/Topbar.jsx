import { Wrapper } from "./Topbar.styles.jsx";
import { Row } from "../../styles/layout.js";
import { Button } from "../../styles/button.js";
import SearchBar from "../SearchBar/SearchBar.jsx";

export default function Topbar() {
  return (
    <Wrapper>
      <Row gap="sm" justify="flex-end" align="center">
        <SearchBar />
        <Button size="lg" variant="solid">
          Log In
        </Button>
      </Row>
    </Wrapper>
  );
}
