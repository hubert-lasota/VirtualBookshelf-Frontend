import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  Grid,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import BookshelfBookFormFields from "../BookshelfBookFormFields";
import CancelButton from "../../../common/components/ui/Button/CancelButton";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { useCreateBookshelfBook } from "../../../common/api/clients/bookshelfBookClient";
import {
  BookshelfBookFormValues,
  createBookshelfBookSchema,
} from "../../../common/models/bookshelfBookModels";

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

  const form = useForm<BookshelfBookFormValues>({
    mode: FORM_VALIDATE_MODE,
    reValidateMode: "onChange",
    resolver: zodResolver(createBookshelfBookSchema(isPlLanguage)),
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const { mutate } = useCreateBookshelfBook();

  const onSubmit = async (bookshelfBook: BookshelfBookFormValues) => {
    mutate({ ...bookshelfBook, bookshelfId: bookshelf.id });
    onClose();
  };

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
        <DialogTitleWithCloseButton onClose={onClose}>
          {isPlLanguage
            ? "Dodaj książkę do regału: "
            : "Add book to bookshelf: "}
          <Typography component="span" fontWeight={600}>
            {bookshelf.name}
          </Typography>
        </DialogTitleWithCloseButton>
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
