import LoginForm from "./LoginForm.js";
import { Box, Stack } from "@mui/material";
import { PageContainer } from "../../common/components/styled.js";

export default function Login() {
  return (
    <PageContainer>
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
