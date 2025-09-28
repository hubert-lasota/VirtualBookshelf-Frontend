import {
  BookshelfFormValues,
  createBookshelfSchema,
} from "../../../common/models/bookshelfModels";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CancelButton from "../../../common/components/Button/CancelButton";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../common/api/clients/bookshelfClient";
import BookshelfFormFields from "./BookshelfFormFields";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import DialogTitleWithCloseButton from "../../../common/components/Dialog/DliagotTitleWithCloseButton";
import { BookshelfFormMode, isBookshelfResponse } from "../shared";
import SubmitButton from "../../../common/components/Button/SubmitButton";
import { TITLE_ENTITY_SEPARATOR } from "../../../common/constants";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";

export default function BookshelfFormDialog() {
  const { currentBookshelf, formMode, onFormModeChange } =
    useBookshelfPageContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const isUpdating =
    isBookshelfResponse(currentBookshelf) &&
    formMode === BookshelfFormMode.UPDATE;

  const { mutateAsync: updateBookshelf } = useUpdateBookshelf();
  const { mutateAsync: createBookshelf } = useCreateBookshelf();

  const form = useForm<BookshelfFormValues>({
    mode: FORM_VALIDATE_MODE,
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
              ? `Edytuj regał${TITLE_ENTITY_SEPARATOR}${currentBookshelf!.name}`
              : "Dodaj nowy regał"
            : isUpdating
              ? `Edit bookshelf${TITLE_ENTITY_SEPARATOR}${currentBookshelf!.name}`
              : "Add new bookshelf"}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          <BookshelfFormFields />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={handleClose} />
          <SubmitButton isUpdating={isUpdating} />
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
