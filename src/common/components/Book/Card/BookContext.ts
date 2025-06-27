import { createContext, useContext } from "react";
import { BookResponse } from "../../bookModels";

export const BookContext = createContext<BookResponse | null>(null);

export function useBookContext() {
  const context = useContext(BookContext);
  if (!context)
    throw new Error(
      "BookCardContext must be used within BookCardContextProvider.",
    );
  return context;
}
