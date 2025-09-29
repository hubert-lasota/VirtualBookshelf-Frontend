import { useGetBookshelves } from "../../common/api/clients/bookshelfClient";
import { useEffect, useMemo, useState } from "react";
import { useGetBookshelfBooks } from "../../common/api/clients/readingBookClient";
import { useUserContext } from "../../common/auth/UserContext";
import {
  ALL_BOOKS_BOOKSHELF_ID,
  AllBooksBookshelf,
  BookshelfFormMode,
  CurrentBookshelf,
  isAllBooksBookshelf,
  isBookshelfResponse,
} from "./shared";
import { ReadingBookResponse } from "../../common/models/readingBookModels";
import { BookshelfPageContext } from "./BookshelfPageContext";
import BookshelfFormDialog from "./BookshelfForm/BookshelfFormDialog";
import BookshelfTabs from "./BookshelfTabs/BookshelfTabs";
import BookshelfPageHeader from "./BookshelfPageHeader";
import ReadingBookGrid from "./ReadingBookGrid/ReadingBookGrid";
import BookshelfToolbar from "./BookshelfToolbar";
import LoggedInPageContainer from "../LoggedInLayout/LoggedInPageContainer";
import { BookFilter } from "../../common/models/bookModels";

const totalBookSuffix = (totalBooks: number, isPlLanguage: boolean) => {
  if (totalBooks === 1) {
    return isPlLanguage ? "książkę" : "book";
  }
  if (totalBooks === 0 || totalBooks >= 5) {
    return isPlLanguage ? "książek" : "books";
  }
  return isPlLanguage ? "książki" : "books";
};

const initFilters: BookFilter = {
  pageCountRange: {
    gte: undefined,
    lte: undefined,
  },
  publicationYearRange: {
    gte: undefined,
    lte: undefined,
  },
};

export default function BookshelfPage() {
  const { data: { bookshelves = [] } = {} } = useGetBookshelves();
  const [filter, setFilter] = useState<BookFilter>(initFilters);

  const { data: { readingBooks = [] } = {} } = useGetBookshelfBooks(filter);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const totalBooks = bookshelves.reduce(
    (acc, shelf) => acc + shelf.totalBooks,
    0,
  );
  const allBooksBookshelf: AllBooksBookshelf = {
    id: ALL_BOOKS_BOOKSHELF_ID,
    name: isPlLanguage ? "Wszystkie książki" : "All books",
    totalBooks,
    description:
      (isPlLanguage
        ? `Posiadasz łącznie ${totalBooks} `
        : `You have ${totalBooks} `) +
      totalBookSuffix(totalBooks, isPlLanguage),
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

    [bookshelves, readingBooks, currentBookshelf],
  );
  return (
    <BookshelfPageContext.Provider
      value={{
        currentBookshelf,
        onCurrentBookshelfChange: (bookshelf) => setCurrentBookshelf(bookshelf),
        allBooksBookshelf,
        selectAllBooksBookshelf: () => setCurrentBookshelf(allBooksBookshelf),
        readingBooks: filteredBooks,
        bookshelves,
        formMode,
        onFormModeChange: (formMode) => setFormMode(formMode),
        filter,
        setFilter,
        resetFilter: () => setFilter({ ...initFilters, query: filter.query }),
      }}
    >
      <LoggedInPageContainer spacing={3}>
        <BookshelfTabs />
        <BookshelfPageHeader />
        <BookshelfToolbar />
        <ReadingBookGrid />
      </LoggedInPageContainer>
      {formMode !== BookshelfFormMode.CLOSED && <BookshelfFormDialog />}
    </BookshelfPageContext.Provider>
  );
}
