import {
  BookshelfFormValues,
  BookshelfResponse,
  createBookshelfSchema,
} from "../../../../common/models/bookshelfModels";
import { useUserContext } from "../../../../common/auth/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../../common/api/clients/bookshelfClient";
import BookshelfFormFields from "./BookshelfFormFields";
import { TITLE_ENTITY_SEPARATOR } from "../../../../common/constants";
import FormDialog from "../../../../common/components/Form/FormDialog";

type Props = {
  onClose: () => void;
  bookshelf?: BookshelfResponse;
};

export default function BookshelfFormDialog({ onClose, bookshelf }: Props) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const isUpdating = !!bookshelf;

  const { mutateAsync: updateBookshelf } = useUpdateBookshelf();
  const { mutateAsync: createBookshelf } = useCreateBookshelf();

  const onSubmit = async (bookshelfFormValues: BookshelfFormValues) => {
    if (isUpdating) {
      await updateBookshelf({
        bookshelf: bookshelfFormValues,
        bookshelfId: bookshelf!.id,
      });
    } else {
      await createBookshelf(bookshelfFormValues);
    }

    onClose();
  };

  const addTitle = isPlLanguage ? "Dodaj nowy regał" : "Add new bookshelf";
  const updateTitle =
    (isUpdating ? "Edytuj regał" : "Edit bookshelf") +
    TITLE_ENTITY_SEPARATOR +
    bookshelf?.name;
  return (
    <FormDialog<BookshelfFormValues>
      open
      onClose={onClose}
      onSubmit={onSubmit}
      defaultValues={isUpdating ? bookshelf : undefined}
      resolver={zodResolver(createBookshelfSchema(isPlLanguage))}
      title={isUpdating ? updateTitle : addTitle}
      actionProps={{
        submitButtonProps: { isUpdating },
      }}
    >
      <BookshelfFormFields />
    </FormDialog>
  );
}
