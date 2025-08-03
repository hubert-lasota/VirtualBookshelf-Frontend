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
import { Box } from "@mui/material";
import BookshelfSidebar from "./BookshelfSidebar";

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

  const allBooksBookshelf: AllBooksBookshelf = {
    name: isPlLanguage ? "Wszystkie książki" : "All books",
    totalBooks: bookshelves.reduce((acc, shelf) => acc + shelf.totalBooks, 0),
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
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplateColumns: "1fr 200px",
        }}
      >
        <div>text</div>
        <BookshelfSidebar />
      </Box>
      {formMode !== BookshelfFormMode.CLOSED && <BookshelfFormDialog />}
    </BookshelfViewContext.Provider>
  );
}
