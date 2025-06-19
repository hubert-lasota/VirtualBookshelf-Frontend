import React, { createContext, useContext } from "react";
import { BookshelfResponse } from "../../features/bookshelf/bookshelfModels";

type BookshelfPageContextValue = {
  bookshelves: BookshelfResponse[];
  currentBookshelfIndex: number;
  setCurrentBookshelfIndex: React.Dispatch<React.SetStateAction<number>>;
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
