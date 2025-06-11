import { createContext, useContext } from "react";
import { Bookshelf } from "../../../features/bookshelf/models";

export enum Action {
  MUTATE_BOOKSHELF = "mutateBookshelf",
  UNKNOWN = "unknown",
}

type ManageBookshelvesContextValue = {
  selectedBookshelf: Bookshelf | null;
  setSelectedBookshelf: (bookshelf: Bookshelf | null) => void;
  action: Action;
  setAction: (action: Action) => void;
};

export const ManageBookshelvesContext =
  createContext<ManageBookshelvesContextValue | null>(null);

export function useManageBookshelvesContext() {
  const context = useContext(ManageBookshelvesContext);
  if (!context) {
    throw new Error(
      "useManageBookshelvesContext must be used within the context",
    );
  }
  return context;
}
