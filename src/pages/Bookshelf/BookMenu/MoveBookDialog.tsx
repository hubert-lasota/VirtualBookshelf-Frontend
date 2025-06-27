import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import ControlledSelect from "../../../common/components/FormInput/ControlledSelect";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import {
  BookshelfBookResponse,
  BookshelfResponse,
} from "../../../common/models/bookshelfModels";
import { useMoveBookshelfBook } from "../../../common/api/bookshelfBookClient";
import { findBookshelf } from "../common";

type MoveBookDialogProps = {
  bookshelfBook: BookshelfBookResponse;
  onClose: () => void;
} & Pick<DialogProps, "open">;

type FormType = { bookshelf: BookshelfResponse };

export default function MoveBookDialog({
  open,
  onClose,
  bookshelfBook,
}: MoveBookDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { bookshelves } = useBookshelfPageContext();

  const { mutate } = useMoveBookshelfBook();

  const bookshelf = findBookshelf(bookshelves, bookshelfBook.id);

  const form = useForm<FormType>({
    mode: FORM_VALIDATE_MODE,
    defaultValues: { bookshelf },
  });

  const onSubmit = ({ bookshelf }: FormType) => {
    mutate({ bookshelfId: bookshelf.id, bookshelfBookId: bookshelfBook.id });
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
        <DialogTitle>
          {isPlLanguage ? "Wybierz nowy regał" : "Select new bookshelf"}
        </DialogTitle>
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
          <Button onClick={onClose}>
            {isPlLanguage ? "Anuluj" : "Cancel"}
          </Button>
          <Button type="submit" variant="contained">
            {isPlLanguage ? "Potwierdź" : "Confirm"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
