// src/theme.js
export const theme = {
  fonts: {
    header: "'VT323', monospace",
    body: "'IBM Plex Sans', sans-serif",
    mono: "'DM Mono', monospace",
  },

  fontSizes: {
    xs: "0.75rem",
    sm: "0.875rem",
    base: "1rem",
    lg: "1.25rem",
    xl: "1.5rem",
    xxl: "2.25rem",
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    bold: 700,
  },

  space: {
    xs: "4px",
    sm: "8px",
    md: "12px",
    lg: "16px",
    xl: "24px",
    xxl: "32px",
    huge: "48px",
  },

  radius: {
    none: "0px",
    xs: "2px",
    sm: "4px",
    md: "6px",
    lg: "8px",
    xl: "12px",
    full: "9999px", // pills/circles
  },

  layout: {
    sidebarWidth: "251px",
    topbarHeight: "57px",
    bottomBarHeight: "80px",
    bottomBarMobile: "115px",
    bottomBarMobileSideBarPadding: "121px",
    sidebarWidthCollapse: "65px",
  },

  // colors: {
  //   bg: "#0D1B2A",
  //   text: "#E0FBFC",
  //   accent: "#FF006E",
  //   accentAlt: "#FB5607",
  //   muted: "#7A8CA6",
  //   danger: "#E74C3C",
  //   dangerAlt: "#C0392B",

  //   // UI surfaces
  //   surface0: "#0D1B2A",
  //   surface1: "#152238",
  //   surface2: "#1B2A46",
  //   surface3: "#233455",
  // },
  colors: {
    bg: "#0B1A0F", // deep evergreen night
    text: "#F2F7F5", // frosted white
    accent: "#C81D25", // rich christmas red
    accentAlt: "#E63946", // brighter festive red
    muted: "#8FA59C", // pine-frost gray-green
    danger: "#B3001B", // darker poinsettia red
    dangerAlt: "#7A0013", // deep wine red

    // UI surfaces (tree-shade layering)
    surface0: "#0B1A0F",
    surface1: "#11261A",
    surface2: "#173323",
    surface3: "#1E4230",
  },
};
