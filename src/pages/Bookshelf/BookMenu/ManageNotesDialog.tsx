import { Dialog, DialogContent, DialogProps, DialogTitle } from "@mui/material";
import { BookshelfBookWithBookshelfHeader } from "../../../common/models/bookshelfBookModels";
import DialogCloseButton from "../../../common/components/ui/Dialog/DialogCloseButton";
import { useUserContext } from "../../../common/auth/UserContext";
import { useState } from "react";
import ManageNotesActions from "./ManageNotesActions";
import { useUpdateBookshelfBook } from "../../../common/api/bookshelfBookClient";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";

type ManageNotesDialogProps = Pick<DialogProps, "open"> & {
  bookshelfBook: BookshelfBookWithBookshelfHeader;
  onClose: () => void;
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
        <DialogTitleWithCloseButton onClose={onClose}>
          {isPlLanguage ? "Zarządzaj notatkami" : "Manage notes"}
        </DialogTitleWithCloseButton>
        <DialogCloseButton onClose={onClose} />
        <DialogContent></DialogContent>
        <ManageNotesActions saved={saved} onClose={onClose} />
      </Dialog>
    </FormProvider>
  );
}
