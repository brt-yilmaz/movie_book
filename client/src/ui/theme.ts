import { ThemeOptions, alpha } from "@mui/material";
// color design tokens export
export const colorTokens = {
  grey: {
    0: "#e2e8f0",
    10: "#cbd5e1",
    50: "#F0F0F0",
    100: "#E0E0E0",
    200: "#C2C2C2",
    300: "#A3A3A3",
    400: "#858585",
    500: "#666666",
    600: "#4D4D4D",
    700: "#333333",
    800: "#0f172a",
    900: "#020617",
    1000: "#000000",
    
  },
  primary: {
    50: "#E6FBFF",
    100: "#CCF7FE",
    200: "#99EEFD",
    300: "#66E6FC",
    400: "#33DDFB",
    500: "#00D5FA",
    600: "#00A0BC",
    700: "#006B7D",
    800: "#00353F",
    900: "#001519",
  },

  background: {
    moviesContainerDark: '#1f2937',
    moviesContainerLight: '#9ca3af'
  }
};


// mui theme settings
export const themeSettings = (mode: "light" | "dark"): ThemeOptions => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              main: colorTokens.primary[500],
              light: colorTokens.primary[800],
              
            },
            neutral: {
              dark: colorTokens.grey[100],
              main: colorTokens.grey[200],
              mediumMain: colorTokens.grey[300],
              medium: colorTokens.grey[400],
              light: colorTokens.grey[700],
              moviesContainer: colorTokens.background.moviesContainerDark,
            },
            background: {
              default: colorTokens.grey[900],
              paper: alpha(colorTokens.grey[800], 0.8),
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[500],
              light: colorTokens.primary[50],
            },
            neutral: {
              dark: colorTokens.grey[700],
              main: colorTokens.grey[500],
              mediumMain: colorTokens.grey[400],
              medium: colorTokens.grey[300],
              light: colorTokens.grey[50],
              moviesContainer: colorTokens.background.moviesContainerLight,
            },
            background: {
              default: colorTokens.grey[10],
              paper: alpha(colorTokens.grey[0], 0.8),
            },
          }),
    }
  };
};
