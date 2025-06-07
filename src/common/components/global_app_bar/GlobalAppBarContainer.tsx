import { ReactNode } from "react";
import { AppBar, Toolbar } from "@mui/material";

export default function GlobalAppBarContainer({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <AppBar position="fixed" sx={{ borderRadius: 0 }} color="inherit">
      <Toolbar sx={{ justifyContent: "space-between", alignItems: "center" }}>
        {children}
      </Toolbar>
    </AppBar>
  );
}
