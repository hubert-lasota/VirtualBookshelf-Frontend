import { Box, Stack } from "@mui/material";
import { useBookshelfPageContext } from "./BookshelfPageContext";
import LoggedInPageSubtitle from "../LoggedInLayout/LoggedInPageSubtitle";
import LoggedInPageTitle from "../LoggedInLayout/LoggedInPageTitle";
import BookshelfActionsButton from "./BookshelfActions/BookshelfActionsButton";

export default function BookshelfPageHeader() {
  const { currentBookshelf } = useBookshelfPageContext();

  return (
    <Box>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", width: "100%" }}
      >
        <LoggedInPageTitle>{currentBookshelf.name}</LoggedInPageTitle>
        <BookshelfActionsButton />
      </Stack>
      <LoggedInPageSubtitle>
        {currentBookshelf.description}
      </LoggedInPageSubtitle>
    </Box>
  );
}
