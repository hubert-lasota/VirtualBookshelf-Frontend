import { Dialog, DialogContent, DialogProps } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { BookshelfBookResponse } from "../../../common/models/bookshelfBookModels";
import { useGetBookshelfBookNotes } from "../../../common/api/bookshelfBookNoteClient";
import NoteToolbar from "./NoteToolbar";

type ManageNotesDialogProps = Pick<DialogProps, "open"> & {
  onClose: () => void;
  bookshelfBook: BookshelfBookResponse;
};

export default function ManageNotesDialog({
  open,
  onClose,
  bookshelfBook,
}: ManageNotesDialogProps) {
  const { data: { notes } = {} } = useGetBookshelfBookNotes(bookshelfBook.id);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        {isPlLanguage ? "Notatki" : "Notes"}
        {` - ${bookshelfBook.book.title}`}
      </DialogTitleWithCloseButton>
      <NoteToolbar />
      <DialogContent></DialogContent>
    </Dialog>
  );
}
