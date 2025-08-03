import { Button } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import { useBookshelfViewContext } from "./BookshelfViewContext";
import { BookshelfFormMode } from "./models";

export default function AddBookshelfButton() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { onFormModeChange } = useBookshelfViewContext();

  return (
    <Button
      variant="contained"
      onClick={() => onFormModeChange(BookshelfFormMode.CREATE)}
    >
      {isPlLanguage ? "Dodaj regał" : "Add bookshelf"}
    </Button>
  );
}
