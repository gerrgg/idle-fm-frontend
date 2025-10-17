export const lightTheme = {
  bg: "#FFF8E6",        // soft warm paper tone
  text: "#3A2C27",      // dark brown for retro readability
  accent: "#E85C1C",    // main orange from logo
  accentAlt: "#F4A226", // secondary yellow tone
  muted: "#A67C52",     // subdued warm neutral
};


export const darkTheme = {
  bg: "#2A1E1A",        // deep brown/charcoal background
  text: "#FFF1C1",      // warm off-white text
  accent: "#F37B2F",    // vivid orange pop on dark
  accentAlt: "#F4A226", // complementary golden accent
  muted: "#C89B6D",     // muted tan for low-priority text
};

export const themes = {
  light: lightTheme,
  dark: darkTheme,
};

export const getTheme = (mode) => {
  return themes[mode] || lightTheme;
};
