import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogProps,
  DialogTitle,
  MenuItem,
} from "@mui/material";
import { useUserContext } from "../../../features/user/UserContext";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import ControlledSelect from "../../../common/components/FormInput/ControlledSelect";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { BookshelfResponse } from "../../../features/bookshelf/bookshelfModels";
import { BookshelfBookWithBookshelfHeader } from "../../../features/bookshelf_book/bookshelfBookModels";
import { useSnackbar } from "notistack";

type MoveBookDialogProps = {
  bookshelfBook: BookshelfBookWithBookshelfHeader;
} & Pick<DialogProps, "onClose" | "open">;

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

  const { bookshelves } = useBookshelfPageContext();

  const form = useForm<FormType>({
    mode: FORM_VALIDATE_MODE,
    defaultValues: {
      bookshelf: bookshelves.find((b) => b.id === bookshelfBook.bookshelf.id),
    },
  });

  const onSubmit = () => {
    enqueueSnackbar({
      message: isPlLanguage
        ? "Poprawnie przeniesiono książkę"
        : "Successfully moved book",
      variant: "success",
    });
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
          <Button
            onClick={() => {
              // @ts-ignore
              onClose();
            }}
          >
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
