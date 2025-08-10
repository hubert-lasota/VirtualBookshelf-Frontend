import { Button } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";

export default function AddChallengeButton() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Button variant="contained" size="small" sx={{ fontSize: "1rem" }}>
      {isPlLanguage ? "Dodaj wyzwanie" : "Add challenge"}
    </Button>
  );
}
