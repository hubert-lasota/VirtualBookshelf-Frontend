import { Box, styled } from "@mui/material";

export const PageContainer = styled(Box)(({ theme }) => ({
  height: "100dvh",
  width: "100%",
  backgroundImage: theme.palette.background.defaultGradient,
  backgroundRepeat: "no-repeat",
  zIndex: -1,
}));
