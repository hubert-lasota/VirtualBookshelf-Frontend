import { createTheme } from "@mui/material";
import { amber, blue, green, red } from "@mui/material/colors";

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

const infoColor = {
  50: blue[50],
  100: blue[100],
  200: blue[200],
  300: blue[300],
  400: blue[400],
  500: blue[500],
  600: blue[600],
  700: blue[700],
  800: blue[800],
  900: blue[900],
  A100: blue.A100,
  A200: blue.A200,
  A400: blue.A400,
  A700: blue.A700,
};

const successColor = {
  50: green[50],
  100: green[100],
  200: green[200],
  300: green[300],
  400: green[400],
  500: green[500],
  600: green[600],
  700: green[700],
  800: green[800],
  900: green[900],
  A100: green.A100,
  A200: green.A200,
  A400: green.A400,
  A700: green.A700,
};

const warningColor = {
  50: amber[50],
  100: amber[100],
  200: amber[200],
  300: amber[300],
  400: amber[400],
  500: amber[500],
  600: amber[600],
  700: amber[700],
  800: amber[800],
  900: amber[900],
  A100: amber.A100,
  A200: amber.A200,
  A400: amber.A400,
  A700: amber.A700,
};

const errorColor = {
  50: red[50],
  100: red[100],
  200: red[200],
  300: red[300],
  400: red[400],
  500: red[500],
  600: red[600],
  700: red[700],
  800: red[800],
  900: red[900],
  A100: red.A100,
  A200: red.A200,
  A400: red.A400,
  A700: red.A700,
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
      contrastTextOnLight: "hsl(0 0% 95%)",
      main: primaryColor[500],
      dark: primaryColor[700],
      light: primaryColor[300],
    },
    success: {
      ...successColor,
      contrastText: "#fff",
      contrastTextOnLight: "hsl(0 0% 95%)",
      main: successColor[500],
      dark: successColor[700],
      light: successColor[300],
    },
    info: {
      ...infoColor,
      contrastText: "#fff",
      contrastTextOnLight: "hsl(0 0% 95%)",
      main: infoColor[500],
      dark: infoColor[700],
      light: infoColor[300],
    },
    warning: {
      ...warningColor,
      contrastText: "#fff",
      contrastTextOnLight: "hsl(0 0% 95%)",
      main: warningColor[500],
      dark: warningColor[700],
      light: warningColor[300],
    },
    error: {
      ...errorColor,
      contrastText: "#fff",
      main: errorColor[500],
      dark: errorColor[700],
      light: errorColor[300],
      contrastTextOnLight: "hsl(0 0% 95%)",
    },
    text: {
      primary: "hsl(15, 15%, 16%)",
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
