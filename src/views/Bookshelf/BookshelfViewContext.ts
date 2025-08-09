import { createContext, useContext } from "react";
import { BookshelfResponse } from "../../common/models/bookshelfModels";
import { ReadingBookResponse } from "../../common/models/readingBookModels";
import {
  AllBooksBookshelf,
  BookshelfFormMode,
  CurrentBookshelf,
  ReadingBookFilters,
} from "./models";

type BookshelfViewContextValue = {
  bookshelves: BookshelfResponse[];
  readingBooks: ReadingBookResponse[];
  query: string;
  onQueryChange: (query: string) => void;
  currentBookshelf: CurrentBookshelf;
  onCurrentBookshelfChange: (bookshelf: BookshelfResponse) => void;
  allBooksBookshelf: AllBooksBookshelf;
  selectAllBooksBookshelf: () => void;
  formMode: BookshelfFormMode;
  onFormModeChange: (mode: BookshelfFormMode) => void;
  filters: ReadingBookFilters;
  onFiltersChange: (filters: ReadingBookFilters) => void;
};

export const BookshelfViewContext =
  createContext<BookshelfViewContextValue | null>(null);

export function useBookshelfViewContext() {
  const context = useContext(BookshelfViewContext);
  if (!context) {
    throw new Error(
      "useBookshelfViewContext must be used within BookshelfViewContextProvider",
    );
  }
  return context;
}
