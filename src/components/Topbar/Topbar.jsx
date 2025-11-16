import { Wrapper } from "./Topbar.styles.jsx";
import { Row } from "../../styles/layout.js";
import { Button } from "../../styles/button.js";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../store/authSlice";

function AuthButton({ user, onLogin, onLogout }) {
  if (!user) {
    return (
      <Button size="lg" variant="solid" onClick={onLogin}>
        Log In
      </Button>
    );
  }

  return (
    <Button size="lg" variant="solid" onClick={onLogout}>
      Logout
    </Button>
  );
}

export default function Topbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading } = useSelector((state) => state.auth);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Wrapper>
      <Row gap="sm" justify="flex-end" align="center">
        <SearchBar />
        {loading !== "init" && (
          <AuthButton
            user={user}
            onLogin={handleLogin}
            onLogout={handleLogout}
          />
        )}
      </Row>
    </Wrapper>
  );
}
