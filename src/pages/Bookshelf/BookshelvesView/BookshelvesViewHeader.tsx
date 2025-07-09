import { Box, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useBookshelvesViewContext } from "./BookshelvesViewContext";
import AddButton from "../../../common/components/ui/Button/AddButton";
import { BookshelfFormMode } from "./models";

export default function BookshelvesViewHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf, onFormModeChange } = useBookshelvesViewContext();

  if (!currentBookshelf) {
    throw new Error("currentBookshelf is not defined");
  }

  const totalBooks = currentBookshelf.totalBooks;
  return (
    <Stack
      direction="row"
      sx={{ justifyContent: "space-between", width: "100%" }}
    >
      <Box>
        <Typography fontSize="30px" fontWeight={600}>
          {currentBookshelf.name}
        </Typography>
        <Typography color="textSecondary">
          {isPlLanguage ? "Masz " : "You have "}
          {totalBooks}{" "}
          {isPlLanguage
            ? totalBooks === 1
              ? "książkę"
              : "książek"
            : totalBooks === 1
              ? "book"
              : "books"}
          {isPlLanguage ? " w tym regale" : " in this bookshelf"}
        </Typography>
      </Box>
      <AddButton onClick={() => onFormModeChange(BookshelfFormMode.CREATE)}>
        {isPlLanguage ? "Dodaj regał" : "Add bookshelf"}
      </AddButton>
    </Stack>
  );
}
