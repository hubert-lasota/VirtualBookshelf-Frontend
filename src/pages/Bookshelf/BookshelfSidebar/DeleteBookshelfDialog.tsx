import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useDeleteBookshelf } from "../../../common/api/bookshelfClient";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { ALL_BOOKS_BOOKSHELF_INDEX } from "../common";

type DeleteBookshelfDialogProps = Pick<DialogProps, "open" | "onClose"> & {
  bookshelf: BookshelfResponse;
};

export default function DeleteBookshelfDialog({
  open,
  onClose,
  bookshelf,
}: DeleteBookshelfDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelfIndex, setCurrentBookshelfIndex } =
    useBookshelfPageContext();

  const { mutate } = useDeleteBookshelf();

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {isPlLanguage ? "Usuń regał" : "Delete bookshelf"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          {isPlLanguage
            ? `Czy na pewno chcesz usunąć regał: `
            : `Are you sure you want to delete the bookshelf: `}
          <Typography component="span" fontWeight={600}>
            {bookshelf.name}
          </Typography>
          {"?"}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {/* @ts-ignore */}
        <Button onClick={onClose}>{isPlLanguage ? "Anuluj" : "Cancel"}</Button>
        <Button
          variant="contained"
          color="error"
          onClick={(e) => {
            e.stopPropagation();
            const index =
              currentBookshelfIndex === 0
                ? ALL_BOOKS_BOOKSHELF_INDEX
                : currentBookshelfIndex - 1;
            setCurrentBookshelfIndex(index);
            mutate(bookshelf.id);
            // @ts-ignore
            onClose();
          }}
        >
          {isPlLanguage ? "Usuń" : "Delete"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
