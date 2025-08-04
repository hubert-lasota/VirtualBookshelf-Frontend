import { createContext, useContext } from "react";
import { ReadingNoteResponse } from "../../../../../../common/models/readingNoteModels";

type NoteContextValue = {
  note: ReadingNoteResponse;
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
