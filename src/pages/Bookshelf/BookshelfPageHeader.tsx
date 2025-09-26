import { Box, Button, Stack } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import { useBookshelfPageContext } from "./BookshelfPageContext";
import { BookshelfFormMode } from "./models";
import LoggedInPageSubtitle from "../LoggedInLayout/LoggedInPageSubtitle";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";

export default function BookshelfPageHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf, onFormModeChange } = useBookshelfPageContext();

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", width: "100%" }}
      >
        <LoggedInPageTitle>{currentBookshelf.name}</LoggedInPageTitle>

        <Button
          onClick={() => onFormModeChange(BookshelfFormMode.CREATE)}
          size="small"
          variant="contained"
        >
          {isPlLanguage ? "Dodaj regał" : "Add bookshelf"}
        </Button>
      </Stack>
      <LoggedInPageSubtitle>
        {currentBookshelf.description}
      </LoggedInPageSubtitle>
    </Box>
  );
}
