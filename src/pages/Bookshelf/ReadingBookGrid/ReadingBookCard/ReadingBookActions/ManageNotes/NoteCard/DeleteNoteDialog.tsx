import DeleteEntityDialog from "../../../../../../../common/components/Dialog/DeleteEntityDialog";
import { useUserContext } from "../../../../../../../common/auth/UserContext";
import { useNoteContext } from "./NoteContext";
import { useDeleteReadingNote } from "../../../../../../../common/api/clients/readingNoteClient";
import { useReadingBookContext } from "../../../ReadingBookContext";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../../common/constants";

type DeleteNoteDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function DeleteNoteDialog({
  open,
  onClose,
}: DeleteNoteDialogProps) {
  const { note } = useNoteContext();

  const readingBook = useReadingBookContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate } = useDeleteReadingNote();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() =>
        mutate({ noteId: note.id, readingBookId: readingBook.id })
      }
      title={isPlLanguage ? `Usuń notatkę` : "Delete note"}
      contentText={
        isPlLanguage
          ? `Czy na pewno chcesz usunąć notatkę${TITLE_ENTITY_SEPARATOR}${note.title}?`
          : `Are you sure you want to delete note${TITLE_ENTITY_SEPARATOR}${note.title}?`
      }
    />
  );
}
