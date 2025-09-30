import { createContext, useContext } from "react";
import { BookResponse } from "../../../../common/models/bookModels";

export const BookContext = createContext<BookResponse | null>(null);

export const useBookContext = () => {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error("useBookContext must be used within BookContextProvider");
  }
  return context;
};
