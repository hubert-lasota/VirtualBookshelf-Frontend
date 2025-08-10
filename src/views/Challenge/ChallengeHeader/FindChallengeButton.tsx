import { useUserContext } from "../../../common/auth/UserContext";
import { Button } from "@mui/material";

export default function FindChallengeButton() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Button variant="contained" size="small" sx={{ fontSize: "1rem" }}>
      {isPlLanguage ? "Dołącz do wyzwania" : "Join challenge"}
    </Button>
  );
}
