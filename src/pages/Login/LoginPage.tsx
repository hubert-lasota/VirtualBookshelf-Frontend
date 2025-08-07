import LoginForm from "./LoginForm.js";
import { Stack } from "@mui/material";
import GlobalNavbar from "../../common/components/GlobalNavbar/GlobalNavbar";
import LanguageSelect from "../../common/components/GlobalNavbar/LanguageSelect";
import PageContainer from "../../common/components/ui/layout/PageContainer.js";

export default function LoginPage() {
  return (
    <PageContainer>
      <GlobalNavbar>
        <LanguageSelect />
      </GlobalNavbar>
      <Stack
        direction="row"
        sx={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "85%",
        }}
      >
        <LoginForm />
      </Stack>
    </PageContainer>
  );
}
