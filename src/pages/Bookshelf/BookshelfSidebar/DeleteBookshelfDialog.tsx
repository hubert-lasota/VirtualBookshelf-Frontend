import { DialogProps, Typography } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useDeleteBookshelf } from "../../../common/api/bookshelfClient";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { ALL_BOOKS_BOOKSHELF_INDEX } from "../common";
import DeleteEntityDialog from "../../../common/components/ui/Dialog/DeleteEntityDialog";
import { useSnackbar } from "notistack";

type DeleteBookshelfDialogProps = Pick<DialogProps, "open"> & {
  bookshelf: BookshelfResponse;
  onClose: () => void;
};

export default function DeleteBookshelfDialog({
  open,
  onClose,
  bookshelf,
}: DeleteBookshelfDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useDeleteBookshelf({
    onSuccess: () =>
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie usunięto regał"
          : "Successfully deleted bookshelf",
      }),
    onError: () =>
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas usuwania regału"
          : "Error occured while deleting bookshelf",
      }),
  });

  const { currentBookshelfIndex, setCurrentBookshelfIndex } =
    useBookshelfPageContext();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={(e) => {
        e.stopPropagation();
        const index =
          currentBookshelfIndex === 0
            ? ALL_BOOKS_BOOKSHELF_INDEX
            : currentBookshelfIndex - 1;
        setCurrentBookshelfIndex(index);
        mutate(bookshelf.id);
        onClose();
      }}
      title={isPlLanguage ? "Usuń regał" : "Delete bookshelf"}
      contentText={
        <>
          {isPlLanguage
            ? `Czy na pewno chcesz usunąć regał: `
            : `Are you sure you want to delete the bookshelf: `}
          <Typography component="span" fontWeight={600}>
            {bookshelf.name}
          </Typography>
          {"?"}
        </>
      }
    />
  );
}
