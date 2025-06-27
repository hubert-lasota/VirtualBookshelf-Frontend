import { PageContainer } from "../styles";
import { useUserContext } from "../../../auth/UserContext";
import { CircularProgress, Stack, Typography } from "@mui/material";

export default function LoadingPage() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <PageContainer>
      <Stack sx={{ width: "100%", height: "100%" }}>
        <CircularProgress size={20} color="primary" />
        <Typography>{isPlLanguage ? "Ładowanie..." : "Loading..."}</Typography>
      </Stack>
    </PageContainer>
  );
}
