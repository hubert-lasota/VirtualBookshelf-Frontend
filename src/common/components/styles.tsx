import { Box, Stack, styled } from "@mui/material";
import { ReactNode } from "react";

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
