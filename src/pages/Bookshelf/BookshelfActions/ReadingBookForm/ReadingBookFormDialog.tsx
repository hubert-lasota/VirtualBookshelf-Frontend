import { useUserContext } from "../../../../common/auth/UserContext";
import { zodResolver } from "@hookform/resolvers/zod";
import ReadingBookFormFields from "./ReadingBookFormFields";
import { useCreateReadingBook } from "../../../../common/api/clients/readingBookClient";
import {
  createReadingBookSchema,
  ReadingBookFormValues,
} from "../../../../common/models/readingBookModels";
import { BookshelfResponse } from "../../../../common/models/bookshelfModels";
import FormDialog from "../../../../common/components/Form/FormDialog";
import { TITLE_ENTITY_SEPARATOR } from "../../../../common/constants";

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

  const { mutateAsync } = useCreateReadingBook();

  const onSubmit = async (readingBook: ReadingBookFormValues) => {
    await mutateAsync({ ...readingBook, bookshelfId: bookshelf.id });
    onClose();
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      resolver={zodResolver(createReadingBookSchema(isPlLanguage))}
      paper={{ sx: { minWidth: "70%", maxHeight: "93%" } }}
      title={
        (isPlLanguage ? "Dodaj książkę do regału" : "Add book to bookshelf") +
        TITLE_ENTITY_SEPARATOR +
        bookshelf.name
      }
    >
      <ReadingBookFormFields />
    </FormDialog>
  );
}
