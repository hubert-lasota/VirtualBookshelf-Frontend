import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  MenuItem,
} from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import ControlledSelect from "../../../common/components/FormInput/ControlledSelect";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";
import { useMoveBookshelfBook } from "../../../common/api/bookshelfBookClient";
import CancelButton from "../../../common/components/ui/Button/CancelButton";
import { findBookshelf } from "../../../common/utils/bookshelfUtils";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { BookshelfBookResponse } from "../../../common/models/bookshelfBookModels";
import { useSnackbar } from "notistack";

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

  const { enqueueSnackbar } = useSnackbar();

  const { mutate } = useMoveBookshelfBook({
    onSuccess: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie przeniesiono książkę"
          : "Successfully moved book",
        variant: "success",
      }),

    onError: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas przenoszenia książki"
          : "Error occurred while moving book",
        variant: "error",
      }),
  });

  const { bookshelves } = useBookshelfPageContext();

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
