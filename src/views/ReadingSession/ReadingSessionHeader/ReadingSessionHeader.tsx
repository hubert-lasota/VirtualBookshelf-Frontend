import { useUserContext } from "../../../common/auth/UserContext";
import { Stack } from "@mui/material";
import ViewTitle from "../../../common/components/ui/View/ViewTitle";
import ViewSubtitle from "../../../common/components/ui/View/ViewSubtitle";
import AddReadingSessionButton from "./AddReadingSessionButton";

export default function ReadingSessionHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack>
      <Stack direction="row" sx={{ justifyContent: "space-between" }}>
        <ViewTitle>
          {isPlLanguage ? "Historia sesji czytania" : "Reading session history"}
        </ViewTitle>
        <AddReadingSessionButton />
      </Stack>
      <ViewSubtitle>
        {isPlLanguage
          ? "Przeglądaj swoje sesje czytania i analizuj postępy"
          : "Review your reading sessions and analyze your progress"}
      </ViewSubtitle>
    </Stack>
  );
}
