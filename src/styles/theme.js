export const lightTheme = {
  bg: "#FFF8E6",
  text: "#3A2C27",
  accent: "#E85C1C",
  accentAlt: "#F4A226",
  muted: "#A67C52",
  danger: "#C0392B", // base danger
  dangerAlt: "#A93226", // slightly deeper brick red for hover
};

export const darkTheme = {
  bg: "#2A1E1A",
  text: "#FFF1C1",
  accent: "#F37B2F",
  accentAlt: "#F4A226",
  muted: "#C89B6D",
  danger: "#E74C3C", // base danger
  dangerAlt: "#C0392B", // darker vintage red for hover
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode) => {
  return themes[mode] || lightTheme;
};
