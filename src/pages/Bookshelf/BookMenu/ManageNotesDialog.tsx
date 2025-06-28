import { Dialog, DialogContent, DialogProps } from "@mui/material";
import { createBookshelfBookNoteSchema } from "../../../common/models/bookshelfBookModels";
import DialogCloseButton from "../../../common/components/ui/Dialog/DialogCloseButton";
import { useUserContext } from "../../../common/auth/UserContext";
import { useState } from "react";
import ManageNotesActions from "./ManageNotesActions";
import { useUpdateBookshelfBook } from "../../../common/api/bookshelfBookClient";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { BookshelfBookResponse } from "../../../common/models/bookshelfModels";

type ManageNotesDialogProps = Pick<DialogProps, "open"> & {
  bookshelfBook: BookshelfBookResponse;
  onClose: () => void;
};

const getSchema = (isPlLanguage: boolean) =>
  z.array(createBookshelfBookNoteSchema(isPlLanguage));

type NotesForm = z.infer<ReturnType<typeof getSchema>>;

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

  const form = useForm<NotesForm>({
    mode: FORM_VALIDATE_MODE,
    // @ts-ignore
    defaultValues: { notes: bookshelfBook.notes },
    resolver: zodResolver(getSchema(isPlLanguage)),
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
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{ paper: { component: "form" } }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
