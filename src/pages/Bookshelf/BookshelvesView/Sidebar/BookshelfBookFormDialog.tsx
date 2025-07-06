import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORM_VALIDATE_MODE } from "../../../../common/config/form";
import BookshelfBookFormFields from "../../BookshelfBookFormFields";
import CancelButton from "../../../../common/components/ui/Button/CancelButton";
import DialogTitleWithCloseButton from "../../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { useCreateBookshelfBook } from "../../../../common/api/clients/bookshelfBookClient";
import {
  BookshelfBookFormValues,
  createBookshelfBookSchema,
} from "../../../../common/models/bookshelfBookModels";
import { BookshelfResponse } from "../../../../common/models/bookshelfModels";

type BookFormDialogProps = {
  open: boolean;
  onClose: () => void;
  bookshelf: BookshelfResponse;
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

  const { mutate } = useCreateBookshelfBook();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (bookshelfBook: BookshelfBookFormValues) => {
    mutate({ ...bookshelfBook, bookshelfId: bookshelf.id });
    handleClose();
  };

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            sx: { minWidth: "70%", maxHeight: "93%" },
          },
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DialogTitleWithCloseButton onClose={handleClose}>
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
          <CancelButton onClick={handleClose} />
          <Button variant="contained" type="submit">
            {isPlLanguage ? "Dodaj" : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
