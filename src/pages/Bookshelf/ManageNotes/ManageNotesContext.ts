import { createContext, useContext } from "react";
import { BookshelfBookResponse } from "../../../common/models/bookshelfBookModels";

type ManageNotesContextValue = {
  bookshelfBook: BookshelfBookResponse;
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
