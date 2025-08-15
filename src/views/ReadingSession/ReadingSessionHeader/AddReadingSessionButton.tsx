import { Button } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";

export default function AddReadingSessionButton() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Button variant="contained">
      {isPlLanguage ? "Dodaj sesję" : "Add session"}
    </Button>
  );
}
