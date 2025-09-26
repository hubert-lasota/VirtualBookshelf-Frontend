import { createContext, useContext } from "react";
import { ReadingSessionResponse } from "../../../../common/models/readingSessionModels";

export const ReadingSessionContext =
  createContext<ReadingSessionResponse | null>(null);

export function useReadingSessionContext() {
  const context = useContext(ReadingSessionContext);
  if (!context) {
    throw new Error(
      "useReadingSessionContext must be used within ReadingSessionContextProvider",
    );
  }
  return context;
}
