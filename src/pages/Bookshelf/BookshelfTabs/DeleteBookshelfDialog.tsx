import { DialogProps, Typography } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useDeleteBookshelf } from "../../../common/api/clients/bookshelfClient";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";

import DeleteEntityDialog from "../../../common/components/Dialog/DeleteEntityDialog";

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

  const { mutate } = useDeleteBookshelf();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() => {
        mutate(bookshelf.id);
        onClose();
      }}
      title={isPlLanguage ? "Usuń regał" : "Delete bookshelf"}
      contentText={
        <>
          {isPlLanguage
            ? `Czy na pewno chcesz usunąć regał `
            : `Are you sure you want to delete the bookshelf `}
          <Typography component="span" fontWeight={600} color="textPrimary">
            {bookshelf.name}
          </Typography>
          {"?"}
        </>
      }
    />
  );
}
