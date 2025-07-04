import { createContext, useContext } from "react";
import { BookshelfBookNoteResponse } from "../../../../common/models/bookshelfBookNoteModels";

type NoteContextValue = {
  note: BookshelfBookNoteResponse;
  onEdit: () => void;
};

export const NoteContext = createContext<NoteContextValue | null>(null);

export function useNoteContext() {
  const context = useContext(NoteContext);
  if (!context) {
    throw new Error("useNoteContext must be used within NoteContext");
  }
  return context;
}
