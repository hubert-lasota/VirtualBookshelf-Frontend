import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
} from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useDeleteBookshelfBook } from "../../../common/api/bookshelfBookClient";
import { BookshelfBookResponse } from "../../../common/models/bookshelfModels";
import { findBookshelf } from "../common";
import { useBookshelfPageContext } from "../BookshelfPageContext";

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

  const { bookshelves } = useBookshelfPageContext();

  const { mutate } = useDeleteBookshelfBook();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{isPlLanguage ? "Usuń książkę" : "Delete book"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isPlLanguage
            ? "Czy na pewno chcesz usunąć książkę z regału? Stracisz wszystkie notatki oraz postępy związane z tą książką."
            : "Are you sure you want to remove book from bookshelf? You will lose all notes and progress associated with this book."}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>{isPlLanguage ? "Anuluj" : "Cancel"}</Button>
        <Button
          onClick={() =>
            mutate({
              bookshelfBookId: bookshelfBook.id,
              bookshelfId: findBookshelf(bookshelves, bookshelfBook.id).id,
            })
          }
          variant="contained"
          color="error"
        >
          {isPlLanguage ? "Usuń" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
