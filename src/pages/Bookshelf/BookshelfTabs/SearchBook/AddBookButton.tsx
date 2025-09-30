import { Button } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";

export default function AddBookButton() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Button size="small" variant="contained">
      {isPlLanguage ? "Dodaj" : "Add"}
    </Button>
  );
}
