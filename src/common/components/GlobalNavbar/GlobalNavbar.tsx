import { Stack } from "@mui/material";
import AppLogo from "../AppLogo/AppLogo";
import GlobalAppNavbarContainer from "./GlobalAppNavbarContainer";

export default function GlobalNavbar({ children }: { children: any }) {
  return (
    <GlobalAppNavbarContainer>
      <AppLogo />
      <Stack spacing={2} alignItems="center" direction="row">
        {children}
      </Stack>
    </GlobalAppNavbarContainer>
  );
}
