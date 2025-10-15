import { authApi } from "../api/auth.js";
import { useNavigate } from "react-router-dom";

export default function Header({ user }) {
  const navigate = useNavigate();
  async function handleLogout() {
    try {
      await authApi.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  return (
    <header>
      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <p>
            <button onClick={handleLogout}>Logout</button>
          </p>
        </>
      ) : (
        <p>Header</p>
      )}
    </header>
  );
}
