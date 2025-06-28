import {
  BookshelfFormValues,
  createBookshelfSchema,
} from "../../../common/models/bookshelfModels";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CancelButton from "../../../common/components/ui/Button/CancelButton";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../common/api/bookshelfClient";
import SaveButton from "../../../common/components/ui/Button/SaveButton";
import { useSnackbar } from "notistack";
import { ALL_BOOKS_BOOKSHELF_INDEX } from "../common";
import BookshelfFormFields from "./BookshelfFormFields";

export default function BookshelfForm() {
  const {
    currentBookshelf,
    setIsBookshelfFormOpen,
    setCurrentBookshelfIndex,
    bookshelves,
  } = useBookshelfPageContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const isUpdating = !!currentBookshelf;

  const { mutate: updateBookshelf } = useUpdateBookshelf({
    onSuccess: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie zaktualizowano regał"
          : "Successfully updated bookshelf",
        variant: "success",
      }),

    onError: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas aktualizacji regału"
          : "Error occurred while updating bookshelf",
        variant: "error",
      }),
  });

  const { mutate: createBookshelf } = useCreateBookshelf({
    onMutate: () => setCurrentBookshelfIndex(bookshelves.length),
    onError: () => {
      setCurrentBookshelfIndex(ALL_BOOKS_BOOKSHELF_INDEX);
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas dodawania regału"
          : "Error occurred while adding bookshelf",
        variant: "error",
      });
    },
    onSuccess: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnio utworzono regał"
          : "Successfully created bookshelf",
        variant: "success",
      }),
  });

  const form = useForm<BookshelfFormValues>({
    mode: "all",
    ...(currentBookshelf ? { defaultValues: currentBookshelf } : {}),
    resolver: zodResolver(createBookshelfSchema(isPlLanguage)),
  });

  const onSubmit = (bookshelf: BookshelfFormValues) => {
    if (isUpdating) {
      updateBookshelf({ bookshelf, bookshelfId: currentBookshelf.id });
    } else {
      createBookshelf(bookshelf);
    }

    setIsBookshelfFormOpen(false);
  };

  return (
    <FormProvider {...form}>
      <Box
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        sx={(theme) => ({
          padding: theme.spacing(4),
          paddingLeft: theme.spacing(6),
          width: "100%",
          overflowY: "auto",
        })}
      >
        <Paper
          variant="outlined"
          component={Stack}
          spacing={2}
          sx={(theme) => ({ padding: theme.spacing(3) })}
        >
          <Typography variant="h5" gutterBottom>
            {isPlLanguage
              ? isUpdating
                ? `Edytuj regał: ${currentBookshelf!.name}`
                : "Dodaj nowy regał"
              : isUpdating
                ? `Edit bookshelf: ${currentBookshelf!.name}`
                : "Add new bookshelf"}
          </Typography>
          <BookshelfFormFields />
          <Box>
            <Stack
              direction="row"
              gap={1.5}
              sx={{ width: "100%", justifyContent: "flex-end" }}
            >
              <CancelButton onClick={() => setIsBookshelfFormOpen(false)} />
              <SaveButton />
            </Stack>
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
}
