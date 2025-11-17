// src/components/ThemedToaster/ThemedToaster.jsx
import { Toaster } from "react-hot-toast";
import { useTheme } from "styled-components";

export default function ThemedToaster() {
  const theme = useTheme();

  return (
    <Toaster
      position="center-center"
      gutter={12}
      toastOptions={{
        style: {
          background: theme.colors.surface1,
          color: theme.colors.text,
          border: `1px solid ${theme.colors.surface3}`,
          fontFamily: theme.fonts.body,
          fontSize: theme.fontSizes.base,
          padding: `${theme.space.sm} ${theme.space.md}`,
          borderRadius: theme.radius.md,
        },

        success: {
          style: {
            borderColor: theme.colors.accent,
          },
          iconTheme: {
            primary: theme.colors.accent,
            secondary: theme.colors.surface1,
          },
        },

        error: {
          style: {
            borderColor: theme.colors.danger,
          },
          iconTheme: {
            primary: theme.colors.danger,
            secondary: theme.colors.surface1,
          },
        },
      }}
    />
  );
}
