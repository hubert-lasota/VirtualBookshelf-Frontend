import { AppBar, Stack, Toolbar } from "@mui/material";
import AppLogo from "./AppLogo";

export default function GlobalAppBar({ children }: { children: any }) {
  return (
    <AppBar position="fixed" sx={{ borderRadius: 0 }} color="inherit">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <AppLogo />
        <Stack spacing={2} alignItems="center" direction="row">
          {children}
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
