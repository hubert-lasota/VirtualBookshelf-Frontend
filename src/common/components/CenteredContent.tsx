import { Stack } from "@mui/material";
import { ReactNode } from "react";

export default function CenteredContent({ children }: { children: ReactNode }) {
  return (
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
}
