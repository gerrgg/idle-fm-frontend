import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./theme";

import { useSelector } from "react-redux";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ThemedToaster from "./components/ThemedToaster";

import DashboardLayout from "./layouts/DashboardLayout/";
import LoginPage from "./pages/LoginPage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<DashboardLayout />} />
        </Routes>
      </BrowserRouter>
      <ThemedToaster />
    </ThemeProvider>
  );
}
