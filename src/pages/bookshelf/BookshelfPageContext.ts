import { createContext, useContext } from "react";
import { Bookshelf } from "../../features/bookshelf/models";

type BookshelfPageContextValue = {
  bookshelves: Bookshelf[];
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
