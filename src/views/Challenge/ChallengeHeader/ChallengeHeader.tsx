import { useUserContext } from "../../../common/auth/UserContext";
import { Stack } from "@mui/material";
import AddChallengeButton from "./AddChallengeButton";
import SearchChallengeButton from "./SearchChallengeButton";
import ViewTitle from "../../../common/components/ui/View/ViewTitle";
import ViewSubtitle from "../../../common/components/ui/View/ViewSubtitle";

export default function ChallengeHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack direction="row" justifyContent="space-between">
      <div>
        <ViewTitle>
          {isPlLanguage ? "Wyzwania czytelnicze" : "Reading Challenges"}
        </ViewTitle>
        <ViewSubtitle>
          {isPlLanguage
            ? "Wyznaczaj cele i śledź swoje postępy w czytaniu"
            : "Track your reading progress and achieve your goals"}
        </ViewSubtitle>
      </div>
      <Stack spacing={1}>
        <AddChallengeButton />
        <SearchChallengeButton />
      </Stack>
    </Stack>
  );
}
