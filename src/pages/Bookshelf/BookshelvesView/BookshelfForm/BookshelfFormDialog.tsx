import {
  BookshelfFormValues,
  createBookshelfSchema,
} from "../../../../common/models/bookshelfModels";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CancelButton from "../../../../common/components/ui/Button/CancelButton";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../../common/api/clients/bookshelfClient";
import SaveButton from "../../../../common/components/ui/Button/SaveButton";
import BookshelfFormFields from "./BookshelfFormFields";
import { useBookshelvesViewContext } from "../BookshelvesViewContext";
import DialogTitleWithCloseButton from "../../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { BookshelfFormMode, isBookshelfResponse } from "../models";

export default function BookshelfFormDialog() {
  const { currentBookshelf, formMode, onFormModeChange } =
    useBookshelvesViewContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const isUpdating =
    isBookshelfResponse(currentBookshelf) &&
    formMode === BookshelfFormMode.UPDATE;

  const { mutate: updateBookshelf } = useUpdateBookshelf();

  const { mutate: createBookshelf } = useCreateBookshelf();

  const form = useForm<BookshelfFormValues>({
    mode: "all",
    defaultValues: isUpdating ? currentBookshelf : undefined,
    resolver: zodResolver(createBookshelfSchema(isPlLanguage)),
  });

  const handleClose = () => onFormModeChange(BookshelfFormMode.CLOSED);

  const onSubmit = (bookshelf: BookshelfFormValues) => {
    if (isUpdating) {
      updateBookshelf({ bookshelf, bookshelfId: currentBookshelf.id });
    } else {
      createBookshelf(bookshelf);
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
              ? `Edytuj regał: ${currentBookshelf!.name}`
              : "Dodaj nowy regał"
            : isUpdating
              ? `Edit bookshelf: ${currentBookshelf!.name}`
              : "Add new bookshelf"}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          <BookshelfFormFields />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <SaveButton />
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
