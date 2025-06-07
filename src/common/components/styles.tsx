import { Box, Stack, styled } from "@mui/material";
import { ReactNode } from "react";

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

export const withCenteredContent = (children: ReactNode) => (
  <Stack
    direction="column"
    sx={{
      justifyContent: "center",
      alignItems: "center",
      height: "100%",
      width: "100%",
    }}
  >
    {children}
  </Stack>
);
