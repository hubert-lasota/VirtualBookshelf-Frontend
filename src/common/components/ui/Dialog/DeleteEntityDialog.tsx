import React from "react";
import DialogTitleWithCloseButton from "./DliagotTitleWithCloseButton";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CancelButton from "../Button/CancelButton";
import DeleteButton from "../Button/DeleteButton";

type DeleteEntityDialogProps = {
  open: boolean;
  onClose: () => void;
  onDelete: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  title: React.ReactNode;
  contentText: React.ReactNode;
};

export default function DeleteEntityDialog({
  open,
  onClose,
  onDelete,
  title,
  contentText,
}: DeleteEntityDialogProps) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitleWithCloseButton onClose={onClose}>
        {title}
      </DialogTitleWithCloseButton>
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <CancelButton onClick={onClose} />
        <DeleteButton onClick={onDelete} />
      </DialogActions>
    </Dialog>
  );
}
