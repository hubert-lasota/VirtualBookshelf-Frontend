import { useGetBookshelves } from "../../common/api/clients/bookshelfClient";
import { useEffect, useMemo, useState } from "react";
import { useDebounceValue } from "../../common/hooks";
import { useGetBookshelfBooks } from "../../common/api/clients/readingBookClient";
import { useUserContext } from "../../common/auth/UserContext";
import {
  AllBooksBookshelf,
  BookshelfFormMode,
  CurrentBookshelf,
  isAllBooksBookshelf,
  isBookshelfResponse,
} from "./models";
import { ReadingBookResponse } from "../../common/models/readingBookModels";
import { BookshelfViewContext } from "./BookshelfViewContext";
import BookshelfFormDialog from "./BookshelfForm/BookshelfFormDialog";
import { Stack } from "@mui/material";
import { VIEW_SPACING } from "../LoggedInViewContainer/config";
import BookshelfTabs from "./BookshelfTabs/BookshelfTabs";
import BookshelfViewHeader from "./BookshelfViewHeader";
import BookGrid from "./BookGrid/BookGrid";

export default function BookshelfView() {
  const { data: { bookshelves = [] } = {} } = useGetBookshelves();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 500);

  const { data: { readingBooks = [] } = {} } = useGetBookshelfBooks({
    query: debouncedQuery,
  });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const totalBooks = bookshelves.reduce(
    (acc, shelf) => acc + shelf.totalBooks,
    0,
  );
  const allBooksBookshelf: AllBooksBookshelf = {
    name: isPlLanguage ? "Wszystkie książki" : "All books",
    totalBooks,
    description: isPlLanguage
      ? `Posiadasz łącznie ${totalBooks} książek`
      : `You have ${totalBooks} books in total`,
  };

  const [currentBookshelf, setCurrentBookshelf] =
    useState<CurrentBookshelf>(allBooksBookshelf);

  useEffect(() => {
    if (
      isAllBooksBookshelf(currentBookshelf) &&
      allBooksBookshelf.totalBooks !== currentBookshelf.totalBooks
    ) {
      setCurrentBookshelf(allBooksBookshelf);
    }
  }, [bookshelves]);

  const [formMode, setFormMode] = useState<BookshelfFormMode>(
    BookshelfFormMode.CLOSED,
  );

  const filteredBooks: ReadingBookResponse[] = useMemo(
    () =>
      isBookshelfResponse(currentBookshelf)
        ? readingBooks.filter((b) => b.bookshelf.id === currentBookshelf.id)
        : readingBooks,

    [bookshelves, readingBooks, currentBookshelf, query],
  );
  return (
    <BookshelfViewContext.Provider
      value={{
        currentBookshelf,
        onCurrentBookshelfChange: (bookshelf) => setCurrentBookshelf(bookshelf),
        allBooksBookshelf,
        selectAllBooksBookshelf: () => setCurrentBookshelf(allBooksBookshelf),

        readingBooks: filteredBooks,
        bookshelves,
        query,
        onQueryChange: (query) => setQuery(query),
        formMode,
        onFormModeChange: (formMode) => setFormMode(formMode),
      }}
    >
      <Stack
        spacing={3}
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          padding: theme.spacing(VIEW_SPACING),
        })}
      >
        <BookshelfTabs />
        <BookshelfViewHeader />
        <BookGrid />
      </Stack>
      {formMode !== BookshelfFormMode.CLOSED && <BookshelfFormDialog />}
    </BookshelfViewContext.Provider>
  );
}
