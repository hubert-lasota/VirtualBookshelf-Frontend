import { DialogProps } from "@mui/material";
import { useUserContext } from "../../../../../common/auth/UserContext";
import { useDeleteReadingBook } from "../../../../../common/api/clients/readingBookClient";
import { ReadingBookResponse } from "../../../../../common/models/readingBookModels";
import DeleteEntityDialog from "../../../../../common/components/Dialog/DeleteEntityDialog";

type RemoveBookDialogProps = Pick<DialogProps, "open"> & {
  readingBook: ReadingBookResponse;
  onClose: () => void;
};

export default function DeleteReadingBookDialog({
  open,
  onClose,
  readingBook,
}: RemoveBookDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate } = useDeleteReadingBook();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() => mutate(readingBook.id)}
      title={isPlLanguage ? "Usuń książkę" : "Delete book"}
      contentText={
        isPlLanguage
          ? "Czy na pewno chcesz usunąć książkę z regału? Stracisz wszystkie notatki oraz postępy związane z tą książką."
          : "Are you sure you want to remove book from bookshelf? You will lose all notes and progress associated with this book."
      }
    />
  );
}
