import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { BookshelfBookWithBookshelfHeader } from "../../../common/models/bookshelfBookModels";
import DialogCloseButton from "../../../common/components/Dialog/DialogCloseButton";
import { useUserContext } from "../../../common/auth/UserContext";
import { useState } from "react";
import ManageNotesActions from "./ManageNotesActions";
import { useUpdateBookshelfBook } from "../../../common/api/bookshelfBookClient";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";

type ManageNotesDialogProps = Pick<DialogProps, "open" | "onClose"> & {
  bookshelfBook: BookshelfBookWithBookshelfHeader;
};

export default function ManageNotesDialog({
  open,
  onClose,
  bookshelfBook,
}: ManageNotesDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const [saved, setSaved] = useState(false);

  const { mutate } = useUpdateBookshelfBook();

  const form = useForm({
    mode: FORM_VALIDATE_MODE,
    defaultValues: { notes: bookshelfBook.notes },
  });

  const handleSetSaved = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  const onSubmit = () => {
    handleSetSaved();
    mutate(bookshelfBook);
  };

  return (
    <FormProvider {...form}>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          {isPlLanguage ? "Zarządzaj notatkami" : "Manage notes"}
        </DialogTitle>
        <DialogCloseButton onClose={onClose} />
        <DialogContent></DialogContent>
        <ManageNotesActions saved={saved} onClose={onClose} />
      </Dialog>
    </FormProvider>
  );
}
