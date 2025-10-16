import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";

import { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TempHomepage from "./pages/TempHomepage.jsx";
import { authApi } from "./api/auth.js";
import { Navigate } from "react-router-dom";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await authApi.logout();
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  }

  useEffect(() => {
    (async () => {
      try {
        const res = await authApi.me(); // must include credentials
        setUser(res.user);
      } catch (err) {
        if (err.response?.status === 401) setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              user ? (
                <TempHomepage user={user} handleLogout={handleLogout} />
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route path="*" element={<p>Page not found</p>} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
