import {
  BookshelfFormValues,
  createBookshelfSchema,
} from "../../../common/models/bookshelfModels";
import { DialogContent } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../common/api/clients/bookshelfClient";
import BookshelfFormFields from "./BookshelfFormFields";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { BookshelfFormMode, isBookshelfResponse } from "../shared";
import { TITLE_ENTITY_SEPARATOR } from "../../../common/constants";
import FormDialog from "../../../common/components/Form/FormDialog";

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

  const handleClose = () => onFormModeChange(BookshelfFormMode.CLOSED);

  const onSubmit = async (bookshelf: BookshelfFormValues) => {
    if (isUpdating) {
      await updateBookshelf({ bookshelf, bookshelfId: currentBookshelf.id });
    } else {
      await createBookshelf(bookshelf);
    }

    handleClose();
  };

  const addTitle = isPlLanguage ? "Dodaj nowy regał" : "Add new bookshelf";
  const updateTitle =
    (isUpdating ? "Edytuj regał" : "Edit bookshelf") +
    TITLE_ENTITY_SEPARATOR +
    currentBookshelf!.name;

  return (
    <FormDialog<BookshelfFormValues>
      open={formMode !== BookshelfFormMode.CLOSED}
      onClose={handleClose}
      onSubmit={onSubmit}
      defaultValues={isUpdating ? currentBookshelf : undefined}
      resolver={zodResolver(createBookshelfSchema(isPlLanguage))}
      title={isUpdating ? updateTitle : addTitle}
      actionProps={{
        submitButtonProps: { isUpdating },
      }}
    >
      <DialogContent>
        <BookshelfFormFields />
      </DialogContent>
    </FormDialog>
  );
}
