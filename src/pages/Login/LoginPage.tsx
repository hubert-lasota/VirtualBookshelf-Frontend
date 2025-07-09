import LoginForm from "./LoginForm.js";
import { Box, Stack } from "@mui/material";
import GlobalAppBar from "../../common/components/GlobalAppBar/GlobalAppBar";
import LanguageSelect from "../../common/components/GlobalAppBar/LanguageSelect";
import PageContainer from "../../common/components/ui/layout/PageContainer.js";

export default function LoginPage() {
  return (
    <PageContainer>
      <GlobalAppBar>
        <LanguageSelect />
      </GlobalAppBar>
      <Stack
        direction={{ xs: "column", md: "row" }}
        sx={{
          width: "100%",
          height: "100%",
          padding: "4rem",
          marginInline: "auto",
        }}
      >
        <Box sx={{ order: { xs: 2, md: 1 }, flex: 1, height: "100%" }}>
          bla bla bla
        </Box>
        <Box
          sx={{
            order: { xs: 1, md: 2 },
            flex: 1,
            height: "100%",
          }}
        >
          <LoginForm />
        </Box>
      </Stack>
    </PageContainer>
  );
}
