import DeleteEntityDialog from "../../../../common/components/ui/Dialog/DeleteEntityDialog";
import { useUserContext } from "../../../../common/auth/UserContext";
import { useNoteContext } from "./NoteContext";
import { useDeleteReadingNote } from "../../../../common/api/clients/readingNoteClient";
import useManageNotesContext from "../ManageNotesContext";

type DeleteNoteDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function DeleteNoteDialog({
  open,
  onClose,
}: DeleteNoteDialogProps) {
  const { note } = useNoteContext();

  const { bookshelfBook } = useManageNotesContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate } = useDeleteReadingNote();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() =>
        mutate({ noteId: note.id, bookshelfBookId: bookshelfBook.id })
      }
      title={isPlLanguage ? `Usuń notatkę` : "Delete note"}
      contentText={
        isPlLanguage
          ? `Czy na pewno chcesz usunąć notatkę - ${note.title}?`
          : `Are you sure you want to delete note - ${note.title}?`
      }
    />
  );
}
