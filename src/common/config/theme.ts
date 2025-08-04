import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    secondary: string;
    tab: string;
  }

  interface PaletteColor {
    light: string;
    dark: string;
    main: string;
    contrastText: string;
    contrastTextOnLight: string;
    "50": string;
    "100": string;
    "200": string;
    "300": string;
    "400": string;
    "500": string;
    "600": string;
    "700": string;
    "800": string;
    "900": string;
    [key: string]: string;
  }

  interface SimplePaletteColorOptions {
    contrastTextOnLight: string;
    [key: string]: string | undefined;
  }
}

const primaryColor = {
  50: "hsl(20, 39%, 92%)",
  100: "hsl(24, 43%, 80%)",
  200: "hsl(27, 39%, 67%)",
  300: "hsl(27, 38%, 53%)",
  400: "hsl(29, 49%, 41%)",
  500: "hsl(22, 59%, 25%)",
  600: "hsl(22, 59%, 22%)",
  700: "hsl(22, 61%, 19%)",
  800: "hsl(22, 63%, 15%)",
  900: "hsl(22, 66%, 10%)",
  A100: "hsl(30, 100%, 85%)",
  A200: "hsl(28, 100%, 75%)",
  A400: "hsl(25, 100%, 65%)",
  A700: "hsl(22, 100%, 57%)",
};

const theme = createTheme({
  shape: {
    borderRadius: 3,
  },
  palette: {
    mode: "light",
    divider: "hsl(35 20% 85%)",
    background: {
      default: "hsl(35 20% 96%)",
      paper: "hsl(35 30% 98%)",
      secondary: "hsl(36 27% 90%)",
      tab: "hsl(30, 20%, 96%)",
    },
    primary: {
      ...primaryColor,
      contrastText: "#ffff",
      contrastTextOnLight: "hsl(0 0% 95%)",
      main: primaryColor[500],
      dark: primaryColor[700],
      light: primaryColor[300],
    },
    text: {
      primary: "hsl(15, 15%, 16%)",
      secondary: "rgb(92,76,67)",
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableTouchRipple: true,
        disableFocusRipple: true,
      },
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          fontSize: "1.1rem",
          borderRadius: 8,
          padding: "10px 20px",
        },
      },
    },
  },
});

export default theme;
