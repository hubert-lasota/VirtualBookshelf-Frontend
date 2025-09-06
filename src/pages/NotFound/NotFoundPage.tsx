import PageContainer from "../../common/components/ui/layout/PageContainer.js";
import { Stack, Typography } from "@mui/material";

export default function NotFoundPage() {
  return (
    <PageContainer>
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography variant="h1" color="primary">
          404 Not Found
        </Typography>
      </Stack>
    </PageContainer>
  );
}
