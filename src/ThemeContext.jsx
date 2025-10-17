import { createContext, useContext, useEffect, useState } from "react";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme.js";
import {GlobalStyle} from "./styles/GlobalStyle.js";

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeContextProvider({ children }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("darkMode") === "true";
    setDark(saved);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    localStorage.setItem("darkMode", next);
  };

  return (
    <ThemeContext.Provider value={{ dark, toggleTheme }}>
      <ThemeProvider theme={dark ? darkTheme : lightTheme}>
        <GlobalStyle />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
