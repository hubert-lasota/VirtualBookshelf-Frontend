import { DialogProps } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { useDeleteBookshelfBook } from "../../../../common/api/clients/bookshelfBookClient";
import { BookshelfBookResponse } from "../../../../common/models/bookshelfBookModels";
import DeleteEntityDialog from "../../../../common/components/ui/Dialog/DeleteEntityDialog";

type RemoveBookDialogProps = Pick<DialogProps, "open"> & {
  bookshelfBook: BookshelfBookResponse;
  onClose: () => void;
};

export default function RemoveBookDialog({
  open,
  onClose,
  bookshelfBook,
}: RemoveBookDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate } = useDeleteBookshelfBook();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() => mutate(bookshelfBook.id)}
      title={isPlLanguage ? "Usuń książkę" : "Delete book"}
      contentText={
        isPlLanguage
          ? "Czy na pewno chcesz usunąć książkę z regału? Stracisz wszystkie notatki oraz postępy związane z tą książką."
          : "Are you sure you want to remove book from bookshelf? You will lose all notes and progress associated with this book."
      }
    />
  );
}
