import React, { createContext, useContext } from "react";
import { BookshelfResponse } from "../../common/models/bookshelfModels";

type BookshelfPageContextValue = {
  currentBookshelf?: BookshelfResponse;
  bookshelves: BookshelfResponse[];
  currentBookshelfIndex: number;
  setCurrentBookshelfIndex: React.Dispatch<React.SetStateAction<number>>;
  isBookshelfFormOpen: boolean;
  setIsBookshelfFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onQueryChange: (query: string) => void;
};

export const BookshelfPageContext =
  createContext<BookshelfPageContextValue | null>(null);

export function useBookshelfPageContext() {
  const context = useContext(BookshelfPageContext);
  if (!context) {
    throw new Error(
      "useBookshelfPageContext must be used within BookshelfPageContext",
    );
  }
  return context;
}
