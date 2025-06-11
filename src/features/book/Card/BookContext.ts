import { createContext, useContext } from "react";
import { Book } from "../models";

export const BookContext = createContext<Book | null>(null);

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context)
    throw new Error(
      "BookCardContext must be used within BookCardContextProvider.",
    );
  return context;
}
