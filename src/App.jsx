import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./theme";

import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard/";
import LoginPage from "./pages/LoginPage";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

export default function App() {
  const { user, loading } = useSelector((state) => state.auth);

  if (loading === "init") {
    return null;
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
