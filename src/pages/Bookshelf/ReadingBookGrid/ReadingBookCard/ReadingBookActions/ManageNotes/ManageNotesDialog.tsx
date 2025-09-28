import { Dialog, DialogContent, Stack } from "@mui/material";
import { useGetReadingBookNotes } from "../../../../../../common/api/clients/readingNoteClient";
import { useState } from "react";
import { ReadingNoteResponse } from "../../../../../../common/models/readingNoteModels";
import ManageNotesTitle from "./ManageNotesTitle";
import NoteForm from "./NoteForm";
import NoteToolbar from "./NoteToolbar";
import NoteCard from "./NoteCard/NoteCard";
import { useReadingBookContext } from "../../ReadingBookContext";
import { useDebounceValue } from "../../../../../../common/hooks";

type ManageNotesDialogProps = {
  onClose: () => void;
};

export default function ManageNotesDialog({ onClose }: ManageNotesDialogProps) {
  const readingBook = useReadingBookContext();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query);
  const { data: { notes = [] } = {} } = useGetReadingBookNotes({
    readingBookId: readingBook.id,
    query: debouncedQuery,
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState<ReadingNoteResponse>();

  return (
    <Dialog
      open
      onClose={onClose}
      slotProps={{
        paper: {
          sx: {
            minWidth: "70%",
          },
        },
      }}
    >
      <ManageNotesTitle onClose={onClose} />
      {isFormOpen ? (
        <NoteForm
          onClose={() => setIsFormOpen(false)}
          noteId={noteToUpdate?.id}
          note={noteToUpdate}
        />
      ) : (
        <DialogContent>
          <NoteToolbar
            query={query}
            onQueryChange={(query) => setQuery(query)}
            onAddNote={() => {
              setNoteToUpdate(undefined);
              setIsFormOpen(true);
            }}
          />
          <Stack spacing={2} sx={{ marginTop: "1rem" }}>
            {notes.map((note) => (
              <NoteCard
                note={note}
                onEdit={() => {
                  setIsFormOpen(true);
                  setNoteToUpdate(note);
                }}
              />
            ))}
          </Stack>
        </DialogContent>
      )}
    </Dialog>
  );
}
