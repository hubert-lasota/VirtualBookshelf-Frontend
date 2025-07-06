import { Stack } from "@mui/material";
import BookshelvesViewHeader from "./BookshelvesViewHeader";
import BookGrid from "./BookGrid";
import { useEffect, useMemo, useState } from "react";
import { useGetBookshelves } from "../../../common/api/clients/bookshelfClient";
import { BookshelfBookResponse } from "../../../common/models/bookshelfBookModels";
import { BookshelvesViewContext } from "./BookshelvesViewContext";
import { useGetBookshelfBooks } from "../../../common/api/clients/bookshelfBookClient";
import { useUserContext } from "../../../common/auth/UserContext";
import {
  AllBooksBookshelf,
  BookshelfFormMode,
  CurrentBookshelf,
  isAllBooksBookshelf,
  isBookshelfResponse,
} from "./models";
import BookshelfFormDialog from "./BookshelfForm/BookshelfFormDialog";
import BookshelvesViewSidebar from "./Sidebar/BookshelvesViewSidebar";
import BookshelfToolbar from "./BookshelfToolbar";
import { useDebounceValue } from "../../../common/hooks";

export default function BookshelvesView() {
  const { data: { bookshelves = [] } = {} } = useGetBookshelves();

  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 500);

  const { data: { bookshelfBooks = [] } = {} } = useGetBookshelfBooks({
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

  const filteredBooks: BookshelfBookResponse[] = useMemo(
    () =>
      isBookshelfResponse(currentBookshelf)
        ? bookshelfBooks.filter((b) => b.bookshelf.id === currentBookshelf.id)
        : bookshelfBooks,

    [bookshelves, bookshelfBooks, currentBookshelf, query],
  );

  return (
    <BookshelvesViewContext.Provider
      value={{
        currentBookshelf,
        onCurrentBookshelfChange: (bookshelf) => setCurrentBookshelf(bookshelf),
        allBooksBookshelf,
        selectAllBooksBookshelf: () => setCurrentBookshelf(allBooksBookshelf),
        bookshelfBooks: filteredBooks,
        bookshelves,
        query,
        onQueryChange: (query) => setQuery(query),
        formMode,
        onFormModeChange: (formMode) => setFormMode(formMode),
      }}
    >
      <Stack direction="row" sx={{ width: "100%", height: "100%" }}>
        <BookshelvesViewSidebar />
        <Stack
          spacing={3}
          sx={(theme) => ({
            padding: theme.spacing(4),
            width: "100%",
            height: "100%",
          })}
        >
          <BookshelvesViewHeader />
          <BookshelfToolbar />
          <BookGrid />
        </Stack>
      </Stack>
      {formMode !== BookshelfFormMode.CLOSED && <BookshelfFormDialog />}
    </BookshelvesViewContext.Provider>
  );
}
