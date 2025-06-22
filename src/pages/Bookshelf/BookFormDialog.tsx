import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Typography,
} from "@mui/material";
import DialogCloseButton from "../../common/components/Dialog/DialogCloseButton";
import { useUserContext } from "../../features/user/UserContext";
import { BookshelfResponse } from "../../features/bookshelf/bookshelfModels";
import BookFormFields from "../../features/book/components/BookFormFields";
import { FormProvider, useForm } from "react-hook-form";
import { createBookSchema } from "../../features/book/bookModels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";

type BookFormDialogProps = Pick<DialogProps, "open" | "onClose"> & {
  bookshelf: BookshelfResponse;
};

export default function BookFormDialog({
  open,
  onClose,
  bookshelf,
}: BookFormDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const bookSchema = createBookSchema(isPlLanguage);

  const form = useForm({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(bookSchema),
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const onSubmit = async () => {};

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            component: "form",
            sx: { minWidth: "70%", maxHeight: "93%" },
          },
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DialogTitle>
          {isPlLanguage
            ? "Dodaj książkę do regału: "
            : "Add book to bookshelf: "}
          <Typography component="span" fontWeight={600}>
            {bookshelf.name}
          </Typography>
          <DialogCloseButton onClose={onClose} />
        </DialogTitle>
        <DialogContent dividers>
          <BookFormFields />
        </DialogContent>
        <DialogActions>
          {/* @ts-ignore*/}
          <Button onClick={() => onClose()}>
            {isPlLanguage ? "Anuluj" : "Cancel"}
          </Button>
          <Button variant="contained" type="submit">
            {isPlLanguage ? "Dodaj" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
