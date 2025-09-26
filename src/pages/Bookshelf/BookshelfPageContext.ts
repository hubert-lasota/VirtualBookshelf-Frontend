import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { BookshelfResponse } from "../../common/models/bookshelfModels";
import { ReadingBookResponse } from "../../common/models/readingBookModels";
import {
  AllBooksBookshelf,
  BookshelfFormMode,
  CurrentBookshelf,
} from "./models";
import { BookFilter } from "../../common/models/bookModels";

type BookshelfPageContextValue = {
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
  filter: BookFilter;
  setFilter: Dispatch<SetStateAction<BookFilter>>;
  resetFilter: () => void;
};

export const BookshelfPageContext =
  createContext<BookshelfPageContextValue | null>(null);

export function useBookshelfPageContext() {
  const context = useContext(BookshelfPageContext);
  if (!context) {
    throw new Error(
      "useBookshelfViewContext must be used within BookshelfViewContextProvider",
    );
  }
  return context;
}
