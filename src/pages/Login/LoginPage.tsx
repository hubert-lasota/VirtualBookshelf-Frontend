import LoginForm from "./LoginForm.js";
import { Stack } from "@mui/material";
import GlobalNavbar from "../../common/components/GlobalNavbar/GlobalNavbar";
import LanguageSelect from "../../common/components/GlobalNavbar/LanguageSelect";
import PageContainer from "../../common/components/layout/PageContainer.js";
import { GLOBAL_NAVBAR_HEIGHT } from "../../common/components/GlobalNavbar/config";

export default function LoginPage() {
  return (
    <PageContainer>
      <GlobalNavbar position="static">
        <LanguageSelect />
      </GlobalNavbar>
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: `calc(85% - ${GLOBAL_NAVBAR_HEIGHT})`,
        }}
      >
        <LoginForm />
      </Stack>
    </PageContainer>
  );
}
