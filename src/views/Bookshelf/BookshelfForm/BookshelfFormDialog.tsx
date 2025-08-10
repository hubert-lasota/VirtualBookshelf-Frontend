import {
  BookshelfFormValues,
  createBookshelfSchema,
} from "../../../common/models/bookshelfModels";
import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CancelButton from "../../../common/components/ui/Button/CancelButton";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../common/api/clients/bookshelfClient";
import BookshelfFormFields from "./BookshelfFormFields";
import { useBookshelfViewContext } from "../BookshelfViewContext";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { BookshelfFormMode, isBookshelfResponse } from "../models";

export default function BookshelfFormDialog() {
  const { currentBookshelf, formMode, onFormModeChange } =
    useBookshelfViewContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const isUpdating =
    isBookshelfResponse(currentBookshelf) &&
    formMode === BookshelfFormMode.UPDATE;

  const { mutateAsync: updateBookshelf } = useUpdateBookshelf();
  const { mutateAsync: createBookshelf } = useCreateBookshelf();

  const form = useForm<BookshelfFormValues>({
    mode: "all",
    defaultValues: isUpdating ? currentBookshelf : undefined,
    resolver: zodResolver(createBookshelfSchema(isPlLanguage)),
  });

  const handleClose = () => onFormModeChange(BookshelfFormMode.CLOSED);

  const onSubmit = async (bookshelf: BookshelfFormValues) => {
    if (isUpdating) {
      await updateBookshelf({ bookshelf, bookshelfId: currentBookshelf.id });
    } else {
      await createBookshelf(bookshelf);
    }

    handleClose();
  };

  return (
    <FormProvider {...form}>
      <Dialog
        open={formMode !== BookshelfFormMode.CLOSED}
        onClose={handleClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: form.handleSubmit(onSubmit),
          },
        }}
      >
        <DialogTitleWithCloseButton onClose={handleClose}>
          {isPlLanguage
            ? isUpdating
              ? `Edytuj regał ${currentBookshelf!.name}`
              : "Dodaj nowy regał"
            : isUpdating
              ? `Edit bookshelf ${currentBookshelf!.name}`
              : "Add new bookshelf"}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          <BookshelfFormFields />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <Button
            type="submit"
            variant="contained"
            loading={form.formState.isSubmitting}
          >
            {isPlLanguage
              ? isUpdating
                ? "Edytuj"
                : "Dodaj"
              : isUpdating
                ? "Edit"
                : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
