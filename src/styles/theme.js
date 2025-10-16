export const lightTheme = {
  bg: "#fff",
  text: "#111",
  accent: "#ff5a2f",
};

export const darkTheme = {
  bg: "#111",
  text: "#fff",
  accent: "#ff5a2f",
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode) => {
  return themes[mode] || lightTheme;
};
