import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { BookshelfResponse } from "../../common/models/bookshelfModels";
import { ReadingBookResponse } from "../../common/models/readingBookModels";
import { AllBooksBookshelf, CurrentBookshelf } from "./shared";
import { BookFilter } from "../../common/models/bookModels";

type BookshelfPageContextValue = {
  bookshelves: BookshelfResponse[];
  readingBooks: ReadingBookResponse[];
  currentBookshelf: CurrentBookshelf;
  onCurrentBookshelfChange: (bookshelf: BookshelfResponse) => void;
  allBooksBookshelf: AllBooksBookshelf;
  selectAllBooksBookshelf: () => void;
  filter: BookFilter;
  setFilter: Dispatch<SetStateAction<BookFilter>>;
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
