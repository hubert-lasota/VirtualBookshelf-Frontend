import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import DialogCloseButton from "../../../common/components/ui/Dialog/DialogCloseButton";
import { useUserContext } from "../../../common/auth/UserContext";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";
import { FormProvider, useForm } from "react-hook-form";
import { createBookSchema } from "../../../common/models/bookModels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import BookshelfBookFormFields from "../BookshelfBookFormFields";
import CancelButton from "../../../common/components/ui/Button/CancelButton";

type BookFormDialogProps = Pick<DialogProps, "open"> & {
  bookshelf: BookshelfResponse;
  onClose: () => void;
};

export default function BookshelfBookFormDialog({
  open,
  onClose,
  bookshelf,
}: BookFormDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const bookSchema = createBookSchema(isPlLanguage);

  const form = useForm({
    mode: FORM_VALIDATE_MODE,
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
          <Grid container spacing={2}>
            <BookshelfBookFormFields />
          </Grid>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <Button variant="contained" type="submit">
            {isPlLanguage ? "Dodaj" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
