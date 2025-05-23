import { Box, styled } from "@mui/material";

export const PageContainer = styled(Box)(() => ({
  position: "relative",
  height: "100dvh",
  width: "100%",
  zIndex: 0,
  overflow: "hidden",
  "&::before": {
    content: '""',
    display: "block",
    position: "absolute",
    zIndex: -1,
    inset: 0,
    backgroundImage:
      "radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))",
    backgroundRepeat: "no-repeat",
  },
}));
