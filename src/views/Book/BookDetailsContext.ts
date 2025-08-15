import { createContext, useContext } from "react";
import { BookDetailsResponse } from "../../common/models/bookModels";

export const BookDetailsContext = createContext<BookDetailsResponse | null>(
  null,
);

export function useBookDetailsContext() {
  const context = useContext(BookDetailsContext);
  if (!context) {
    throw new Error(
      "useBookDetailsContext must be used within BookDetailsContextProvider",
    );
  }
  return context;
}
