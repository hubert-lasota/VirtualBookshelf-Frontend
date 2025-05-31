import { ReactNode } from "react";
import { Paper } from "@mui/material";

export default function ResultContainer({ children }: { children: ReactNode }) {
  return (
    <Paper
      variant="outlined"
      sx={(theme) => ({
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(1),
      })}
    >
      {children}
    </Paper>
  );
}
