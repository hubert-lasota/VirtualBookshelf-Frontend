import { Stack } from "@mui/material";
import { useBookshelfViewContext } from "../BookshelfViewContext";
import BookshelfTab from "./BookshelfTab";
import { isAllBooksBookshelf, isBookshelfResponse } from "../models";

export default function BookshelfTabs() {
  const {
    bookshelves,
    allBooksBookshelf,
    currentBookshelf,
    onCurrentBookshelfChange,
    selectAllBooksBookshelf,
  } = useBookshelfViewContext();

  return (
    <Stack
      direction="row"
      spacing={1}
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        backgroundColor: theme.palette.background.secondary,
        padding: theme.spacing(1),
        overflowX: "auto",
      })}
    >
      <BookshelfTab
        bookshelf={allBooksBookshelf}
        isSelected={isAllBooksBookshelf(currentBookshelf)}
        onClick={() => selectAllBooksBookshelf()}
      />
      {bookshelves.map((b) => (
        <BookshelfTab
          key={b.id}
          onClick={() => onCurrentBookshelfChange(b)}
          bookshelf={b}
          isSelected={
            isBookshelfResponse(currentBookshelf) &&
            b.id === currentBookshelf.id
          }
        />
      ))}
    </Stack>
  );
}
