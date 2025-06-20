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
import { useUserContext } from "../../features/user/UserContext";
import { useDeleteBookshelf } from "../../features/bookshelf/bookshelfClient";
import { BookshelfResponse } from "../../features/bookshelf/bookshelfModels";

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
          onClick={() => {
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
