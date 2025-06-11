import { Paper, Stack, Typography } from "@mui/material";
import {
  Action,
  useManageBookshelvesContext,
} from "./ManageBookshelvesContext";
import BookshelfForm from "./Form/BookshelfForm";
import { useUserContext } from "../../../features/user/UserContext";

export default function RightColumn() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { action, selectedBookshelf } = useManageBookshelvesContext();

  return (
    <Stack
      spacing={2}
      flexGrow={2}
      component={Paper}
      variant="outlined"
      sx={(theme) => ({ minHeight: "100%", p: theme.spacing(2.5) })}
    >
      {action === Action.MUTATE_BOOKSHELF && (
        <BookshelfForm bookshelf={selectedBookshelf} />
      )}
      {action === Action.UNKNOWN && (
        <Typography variant="h6" textAlign="center">
          {isPlLanguage
            ? "Dodaj, edytuj lub usuń regał"
            : "Add, edit or delete Bookshelf"}
        </Typography>
      )}
    </Stack>
  );
}
