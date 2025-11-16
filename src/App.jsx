import { useEffect, useState } from "react";
import Dashboard from "./pages/Dashboard/";
import DashboardLayout from "./layouts/DashboardLayout/DashboardLayout";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./styles/GlobalStyles";
import { theme } from "./theme";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Dashboard />
    </ThemeProvider>
  );
}
