import { Box, styled } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
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
    backgroundImage: theme.palette.background.defaultGradient,
    backgroundRepeat: "no-repeat",
  },
}));
