import { Box, Button, Stack } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import { useBookshelfViewContext } from "./BookshelfViewContext";
import { BookshelfFormMode } from "./models";
import ViewSubtitle from "../ViewLayout/ViewSubtitle";
import ViewTitle from "../ViewLayout/ViewTitle";

export default function BookshelfViewHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf, onFormModeChange } = useBookshelfViewContext();

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", width: "100%" }}
      >
        <ViewTitle>{currentBookshelf.name}</ViewTitle>

        <Button
          onClick={() => onFormModeChange(BookshelfFormMode.CREATE)}
          size="small"
          variant="contained"
        >
          {isPlLanguage ? "Dodaj regał" : "Add bookshelf"}
        </Button>
      </Stack>
      <ViewSubtitle>{currentBookshelf.description}</ViewSubtitle>
    </Box>
  );
}
