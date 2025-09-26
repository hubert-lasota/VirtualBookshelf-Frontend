import { createContext, useContext } from "react";
import { ReadingBookResponse } from "../../../../common/models/readingBookModels";

export const ReadingBookContext = createContext<ReadingBookResponse | null>(
  null,
);

export function useReadingBookContext() {
  const context = useContext(ReadingBookContext);
  if (!context) {
    throw new Error(
      "useReadingBookContext must be used within ReadingBookContextProvider",
    );
  }
  return context;
}
