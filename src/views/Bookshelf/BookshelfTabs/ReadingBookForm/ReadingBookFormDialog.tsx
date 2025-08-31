import { Dialog, DialogActions, DialogContent, Grid } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FORM_VALIDATE_MODE } from "../../../../common/config/form";
import ReadingBookFormFields from "./ReadingBookFormFields";
import CancelButton from "../../../../common/components/ui/Button/CancelButton";
import DialogTitleWithCloseButton from "../../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { useCreateReadingBook } from "../../../../common/api/clients/readingBookClient";
import {
  createReadingBookSchema,
  ReadingBookFormValues,
} from "../../../../common/models/readingBookModels";
import { BookshelfResponse } from "../../../../common/models/bookshelfModels";
import SubmitButton from "../../../../common/components/ui/Button/SubmitButton";

type BookFormDialogProps = {
  open: boolean;
  onClose: () => void;
  bookshelf: BookshelfResponse;
};

export default function ReadingBookFormDialog({
  open,
  onClose,
  bookshelf,
}: BookFormDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const form = useForm<ReadingBookFormValues>({
    mode: FORM_VALIDATE_MODE,
    reValidateMode: "onChange",
    resolver: zodResolver(createReadingBookSchema(isPlLanguage)),
  });

  const { mutateAsync } = useCreateReadingBook();

  const handleClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (readingBook: ReadingBookFormValues) => {
    await mutateAsync({ ...readingBook, bookshelfId: bookshelf.id });
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
            onSubmit: form.handleSubmit(onSubmit),
          },
        }}
      >
        <DialogTitleWithCloseButton onClose={handleClose}>
          {isPlLanguage ? "Dodaj książkę do regału " : "Add book to bookshelf "}
          {bookshelf.name}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <ReadingBookFormFields />
          </Grid>
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <SubmitButton />
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
