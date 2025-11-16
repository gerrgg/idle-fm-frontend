import { useNavigate } from "react-router-dom";
import { Wrapper } from "./Topbar.styles.jsx";
import { Row } from "../../styles/layout.js";
import { Button } from "../../styles/button.js";
import SearchBar from "../SearchBar/SearchBar.jsx";

export default function Topbar() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <Row gap="sm" justify="flex-end" align="center">
        <SearchBar />
        <Button size="lg" variant="solid" onClick={handleLogin}>
          Log In
        </Button>
      </Row>
    </Wrapper>
  );
}
