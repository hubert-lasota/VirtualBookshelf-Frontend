import { useUserContext } from "../../common/auth/UserContext";
import { Stack } from "@mui/material";
import ChallengeActionsButton from "./ChallengeActions/ChallengeActionsButton";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";
import LoggedInPageSubtitle from "../LoggedInLayout/LoggedInPageSubtitle";

export default function ChallengeHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack direction="row" justifyContent="space-between">
      <div>
        <LoggedInPageTitle>
          {isPlLanguage ? "Wyzwania czytelnicze" : "Reading Challenges"}
        </LoggedInPageTitle>
        <LoggedInPageSubtitle>
          {isPlLanguage
            ? "Wyznaczaj cele i śledź swoje postępy w czytaniu"
            : "Track your reading progress and achieve your goals"}
        </LoggedInPageSubtitle>
      </div>
      <Stack>
        <ChallengeActionsButton />
      </Stack>
    </Stack>
  );
}
