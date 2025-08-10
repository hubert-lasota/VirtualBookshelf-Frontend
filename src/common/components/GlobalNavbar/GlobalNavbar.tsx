import { Stack } from "@mui/material";
import AppLogo from "../AppLogo/AppLogo";
import GlobalAppNavbarContainer from "./GlobalAppNavbarContainer";

type GlobalNavbarProps = {
  children: React.ReactNode;
  appLogoNavigateTo?: string;
  position?: "fixed" | "absolute" | "sticky" | "static" | "relative";
};

export default function GlobalNavbar({
  children,
  appLogoNavigateTo,
}: GlobalNavbarProps) {
  return (
    <GlobalAppNavbarContainer>
      <AppLogo navigateTo={appLogoNavigateTo} />
      <Stack spacing={2} alignItems="center" direction="row">
        {children}
      </Stack>
    </GlobalAppNavbarContainer>
  );
}
