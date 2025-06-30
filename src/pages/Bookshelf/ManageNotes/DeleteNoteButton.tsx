import { BookshelfBookNoteResponse } from "../../../common/models/bookshelfBookNoteModels";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserContext } from "../../../common/auth/UserContext";
import DeleteEntityDialog from "../../../common/components/ui/Dialog/DeleteEntityDialog";
import { useState } from "react";
import { useDeleteBookshelfBookNote } from "../../../common/api/clients/bookshelfBookNoteClient";
import useManageNotesContext from "./ManageNotesContext";

type DeleteNoteButtonProps = {
  note: BookshelfBookNoteResponse;
};

export default function DeleteNoteButton({ note }: DeleteNoteButtonProps) {
  const [open, setOpen] = useState(false);

  const { mutate } = useDeleteBookshelfBookNote();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { bookshelfBook } = useManageNotesContext();

  return (
    <>
      <Tooltip title={isPlLanguage ? "Usuń notatkę" : "Delete note"}>
        <IconButton onClick={() => setOpen(true)} color="error">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <DeleteEntityDialog
        open={open}
        onClose={() => setOpen(false)}
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
    </>
  );
}
