import { useUserContext } from "../../common/auth/UserContext";
import { Stack } from "@mui/material";
import ViewTitle from "../ViewLayout/ViewTitle";
import ViewSubtitle from "../ViewLayout/ViewSubtitle";

export default function ReadingSessionHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack>
      <ViewTitle>
        {isPlLanguage ? "Historia sesji czytania" : "Reading session history"}
      </ViewTitle>
      <ViewSubtitle>
        {isPlLanguage
          ? "Przeglądaj swoje sesje czytania i analizuj postępy"
          : "Review your reading sessions and analyze your progress"}
      </ViewSubtitle>
    </Stack>
  );
}
