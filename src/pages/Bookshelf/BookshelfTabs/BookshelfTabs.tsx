import { Stack, Typography } from "@mui/material";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import TabStack from "../../../common/components/Tab/TabStack";
import BookshelfActionsButton from "./BookshelfActionsButton";
import { isBookshelfResponse } from "../shared";

export default function BookshelfTabs() {
  const {
    bookshelves,
    allBooksBookshelf,
    currentBookshelf,
    onCurrentBookshelfChange,
    selectAllBooksBookshelf,
  } = useBookshelfPageContext();

  const tabs = [allBooksBookshelf, ...bookshelves].map((bookshelf) => ({
    value: bookshelf.id,
    label: (
      <Stack
        direction="row"
        alignItems="center"
        spacing={1}
        sx={{ height: "25px" }}
      >
        <Typography>
          {bookshelf.name}
          {` (${bookshelf.totalBooks})`}
        </Typography>
        {currentBookshelf.id === bookshelf.id &&
          isBookshelfResponse(currentBookshelf) && <BookshelfActionsButton />}
      </Stack>
    ),
  }));

  return (
    <TabStack
      tabs={tabs}
      maxVisibleTabs={4}
      value={currentBookshelf.id}
      onChange={(_e, bookshelfId) =>
        bookshelfId === allBooksBookshelf.id
          ? selectAllBooksBookshelf()
          : onCurrentBookshelfChange(
              bookshelves.find((b) => b.id === bookshelfId)!,
            )
      }
    />
  );
}
