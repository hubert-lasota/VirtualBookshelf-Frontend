import { createContext, useContext } from "react";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";
import { ReadingBookResponse } from "../../../common/models/readingBookModels";
import {
  AllBooksBookshelf,
  BookshelfFormMode,
  CurrentBookshelf,
} from "./models";

type BookViewContextValue = {
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
};

export const BookshelvesViewContext =
  createContext<BookViewContextValue | null>(null);

export function useBookshelvesViewContext() {
  const context = useContext(BookshelvesViewContext);
  if (!context) {
    throw new Error(
      "useBookViewContext must be used within BookshelvesViewContext",
    );
  }
  return context;
}
