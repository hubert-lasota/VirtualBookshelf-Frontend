import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
} from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../../common/config/form";
import ControlledSelect from "../../../../common/components/FormInput/ControlledSelect";
import { BookshelfResponse } from "../../../../common/models/bookshelfModels";
import { useMoveReadingBook } from "../../../../common/api/clients/readingBookClient";
import CancelButton from "../../../../common/components/ui/Button/CancelButton";
import { findBookshelf } from "../../../../common/utils/bookshelfUtils";
import DialogTitleWithCloseButton from "../../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { ReadingBookResponse } from "../../../../common/models/readingBookModels";
import { useBookshelvesViewContext } from "../BookshelvesViewContext";

type MoveBookDialogProps = {
  readingBook: ReadingBookResponse;
  onClose: () => void;
  open: boolean;
};

type FormType = { bookshelf: BookshelfResponse };

export default function MoveReadingBookDialog({
  open,
  onClose,
  readingBook,
}: MoveBookDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate } = useMoveReadingBook();

  const { bookshelves } = useBookshelvesViewContext();

  const bookshelf = findBookshelf(bookshelves, readingBook.id);

  const form = useForm<FormType>({
    mode: FORM_VALIDATE_MODE,
    defaultValues: { bookshelf },
  });

  const onSubmit = ({ bookshelf }: FormType) => {
    mutate({ bookshelfId: bookshelf.id, readingBookId: readingBook.id });
  };

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            component: "form",
            sx: { minWidth: "35%" },
          },
        }}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <DialogTitleWithCloseButton onClose={onClose}>
          {isPlLanguage ? "Wybierz nowy regał" : "Select new bookshelf"}
        </DialogTitleWithCloseButton>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <Button type="submit" variant="contained">
            {isPlLanguage ? "Potwierdź" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
