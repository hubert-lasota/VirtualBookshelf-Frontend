import { useUserContext } from "../../common/auth/UserContext";
import { Stack } from "@mui/material";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";
import LoggedInPageSubtitle from "../LoggedInLayout/LoggedInPageSubtitle";

export default function ReadingSessionHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack>
      <LoggedInPageTitle>
        {isPlLanguage ? "Historia sesji czytania" : "Reading session history"}
      </LoggedInPageTitle>
      <LoggedInPageSubtitle>
        {isPlLanguage
          ? "Przeglądaj swoje sesje czytania i analizuj postępy"
          : "Review your reading sessions and analyze your progress"}
      </LoggedInPageSubtitle>
    </Stack>
  );
}
