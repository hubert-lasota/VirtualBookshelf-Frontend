import { createTheme } from "@mui/material";

declare module "@mui/material/styles" {
  interface TypeBackground {
    defaultGradient: string;
  }
}

const theme = createTheme({
  palette: {
    mode: "light",
    background: {
      default: "hsl(0, 0%, 99%)",
      defaultGradient:
        "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    },
    text: {
      secondary: "hsl(220, 20%, 35%)",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
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
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.palette.background.default,
          borderRadius: 8,
        }),
      },
    },
  },
});

export default theme;
