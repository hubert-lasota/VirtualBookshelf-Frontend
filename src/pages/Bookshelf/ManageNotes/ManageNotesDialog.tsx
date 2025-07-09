import { Dialog, DialogContent, Stack } from "@mui/material";
import { ReadingBookResponse } from "../../../common/models/readingBookModels";
import { useGetReadingBookNotes } from "../../../common/api/clients/readingNoteClient";
import { useMemo, useState } from "react";
import { ReadingNoteResponse } from "../../../common/models/readingNoteModels";
import ManageNotesTitle from "./ManageNotesTitle";
import NoteForm from "./NoteForm";
import NoteToolbar from "./NoteToolbar";
import { ManageNotesContext } from "./ManageNotesContext";
import NoteCard from "./NoteCard/NoteCard";

type ManageNotesDialogProps = {
  open: boolean;
  onClose: () => void;
  readingBook: ReadingBookResponse;
};

export default function ManageNotesDialog({
  open,
  onClose,
  readingBook,
}: ManageNotesDialogProps) {
  const { data: { notes } = {} } = useGetReadingBookNotes(readingBook.id);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [noteToUpdate, setNoteToUpdate] = useState<ReadingNoteResponse>();

  const [query, setQuery] = useState("");

  const notesFiltered: ReadingNoteResponse[] = useMemo(() => {
    if (!notes) return [];
    if (!query) return notes;

    return notes.filter(({ title, content }) => {
      const queryLowerCase = query.toLowerCase();
      return (
        title.toLowerCase().includes(queryLowerCase) ||
        content.toLowerCase().includes(queryLowerCase)
      );
    });
  }, [notes, query]);

  return (
    <ManageNotesContext.Provider value={{ bookshelfBook: readingBook }}>
      <Dialog
        open={open}
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
        <DialogContent
          sx={(theme) => ({
            backgroundImage: theme.palette.background.defaultGradient,
          })}
        >
          {isFormOpen ? (
            <NoteForm
              onClose={() => setIsFormOpen(false)}
              noteId={noteToUpdate?.id}
              note={noteToUpdate}
            />
          ) : (
            <>
              <NoteToolbar
                query={query}
                onQueryChange={(query) => setQuery(query)}
                onAddNote={() => {
                  setNoteToUpdate(undefined);
                  setIsFormOpen(true);
                }}
              />
              <Stack spacing={2} sx={{ marginTop: "1rem" }}>
                {notesFiltered.map((note) => (
                  <NoteCard
                    note={note}
                    onEdit={() => {
                      setIsFormOpen(true);
                      setNoteToUpdate(note);
                    }}
                  />
                ))}
              </Stack>
            </>
          )}
        </DialogContent>
      </Dialog>
    </ManageNotesContext.Provider>
  );
}
