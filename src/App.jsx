import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "./styles/GlobalStyle";
import { lightTheme, darkTheme } from "./styles/theme";

import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import TempHomepage from "./pages/TempHomepage.jsx";
import ForgotPasswordPage from "./pages/ForgotPasswordPage.jsx";
import ResetPasswordPage from "./pages/ResetPasswordPage.jsx";
import CreatePlaylistPage from "./pages/CreatePlaylistPage.jsx";
import EditPlaylistPage from "./pages/EditPlaylistPage.jsx";

import Static from "./components/Static.jsx";
import ThemedToaster from "./components/ThemedToaster.jsx";

import { authApi } from "./api/auth.js";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  async function handleLogout(e) {
    e.preventDefault();
    try {
      await authApi.logout();
      setUser(null);
      toast.success("Logout successful", {
        id: "logout-success",
      });
    } catch (err) {
      toast.error(err.message || "Logout failed", {
        id: "logout-error",
      });
      console.error("Logout error:", err);
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

  if (loading) return <Static ready={loading} />;

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage setUser={setUser} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route
            path="/create/playlist"
            element={<CreatePlaylistPage user={user} />}
          />
          <Route
            path="/edit/playlist/:id"
            element={<EditPlaylistPage user={user} />}
          />
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
      <ThemedToaster />
    </ThemeProvider>
  );
}

export default App;
