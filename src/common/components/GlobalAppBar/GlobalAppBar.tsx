import { Stack } from "@mui/material";
import AppLogo from "./AppLogo";
import GlobalAppBarContainer from "./GlobalAppBarContainer";

export default function GlobalAppBar({ children }: { children: any }) {
  return (
    <GlobalAppBarContainer>
      <AppLogo />
      <Stack spacing={2} alignItems="center" direction="row">
        {children}
      </Stack>
    </GlobalAppBarContainer>
  );
}
