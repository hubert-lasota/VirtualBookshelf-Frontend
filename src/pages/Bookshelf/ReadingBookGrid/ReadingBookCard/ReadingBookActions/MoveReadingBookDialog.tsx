import { MenuItem } from "@mui/material";
import { useUserContext } from "../../../../../common/auth/UserContext";
import ControlledSelect from "../../../../../common/components/Form/Input/ControlledSelect";
import { BookshelfResponse } from "../../../../../common/models/bookshelfModels";
import { useMoveReadingBook } from "../../../../../common/api/clients/readingBookClient";
import { ReadingBookResponse } from "../../../../../common/models/readingBookModels";
import { useBookshelfPageContext } from "../../../BookshelfPageContext";
import FormDialog from "../../../../../common/components/Form/FormDialog";

type MoveBookDialogProps = {
  readingBook: ReadingBookResponse;
  onClose: () => void;
  open: boolean;
};

type FormValues = { bookshelf: BookshelfResponse };

export default function MoveReadingBookDialog({
  open,
  onClose,
  readingBook,
}: MoveBookDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate } = useMoveReadingBook();

  const { bookshelves } = useBookshelfPageContext();

  const onSubmit = ({ bookshelf }: FormValues) => {
    mutate({ bookshelfId: bookshelf.id, readingBookId: readingBook.id });
  };

  return (
    <FormDialog
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      defaultValues={{ bookshelf: readingBook.bookshelf }}
      title={isPlLanguage ? "Wybierz nowy regał" : "Select new bookshelf"}
      paper={{ sx: { minWidth: "35%" } }}
      actionProps={{
        submitButtonProps: { children: isPlLanguage ? "Potwierdź" : "Confirm" },
      }}
    >
      <ControlledSelect
        name="bookshelf"
        renderValue={(bookshelf) =>
          (bookshelf as BookshelfResponse)?.name ?? ""
        }
      >
        {bookshelves.map((bookshelf) => (
          <MenuItem key={bookshelf.id} value={bookshelf as any}>
            {bookshelf.name}
          </MenuItem>
        ))}
      </ControlledSelect>
    </FormDialog>
  );
}
