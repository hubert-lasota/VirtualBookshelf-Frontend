import { createContext, useContext } from "react";
import { ReadingBookResponse } from "../../../../../common/models/readingBookModels";

type ManageNotesContextValue = {
  readingBook: ReadingBookResponse;
};

export const ManageNotesContext = createContext<ManageNotesContextValue | null>(
  null,
);

export default function useManageNotesContext() {
  const context = useContext(ManageNotesContext);
  if (!context) {
    throw new Error(
      "useManageNotesContext must be used within ManageNotesContext",
    );
  }
  return context;
}
