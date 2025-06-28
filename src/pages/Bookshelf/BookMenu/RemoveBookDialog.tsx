import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
} from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useDeleteBookshelfBook } from "../../../common/api/bookshelfBookClient";
import { BookshelfBookResponse } from "../../../common/models/bookshelfModels";
import CancelButton from "../../../common/components/ui/Button/CancelButton";
import DeleteButton from "../../../common/components/ui/Button/DeleteButton";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";

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
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        {isPlLanguage ? "Usuń książkę" : "Delete book"}
      </DialogTitleWithCloseButton>
      <DialogContent>
        <DialogContentText>
          {isPlLanguage
            ? "Czy na pewno chcesz usunąć książkę z regału? Stracisz wszystkie notatki oraz postępy związane z tą książką."
            : "Are you sure you want to remove book from bookshelf? You will lose all notes and progress associated with this book."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <DeleteButton onClick={() => mutate(bookshelfBook.id)} />
      </DialogActions>
    </Dialog>
  );
}
