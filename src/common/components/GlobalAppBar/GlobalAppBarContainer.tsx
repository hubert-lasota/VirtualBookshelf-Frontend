import { ReactNode } from "react";
import { AppBar, Toolbar } from "@mui/material";

export default function GlobalAppBarContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={(theme) => ({
        borderRadius: 0,
        borderBottom: `1.5px solid ${theme.palette.divider}`,
        boxShadow: `0px 1px 6px 0px rgba(0, 0, 0, 0.1)`,
      })}
      color="inherit"
    >
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {children}
      </Toolbar>
    </AppBar>
  );
}
