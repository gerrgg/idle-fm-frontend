import { Toaster } from "react-hot-toast";
import { useTheme } from "styled-components";

function ThemedToaster() {
  const theme = useTheme();
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: theme.bg,
          color: theme.text,
          border: `1px solid ${theme.accent}`,
          fontFamily: theme.font,
        },
        success: {
          iconTheme: {
            primary: theme.accent,
            secondary: theme.bg,
          },
        },
        error: {
          iconTheme: {
            primary: theme.error,
            secondary: theme.bg,
          },
        },
      }}
    />
  );
}

export default ThemedToaster;
