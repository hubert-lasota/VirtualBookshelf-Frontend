import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  DialogProps,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import { FormProvider, useFieldArray, useForm } from "react-hook-form";
import {
  Book as BookIcon,
  Delete as DeleteIcon,
  KeyboardArrowDown as KeyboardArrowDownIcon,
  KeyboardArrowUp as KeyboardArrowUpIcon,
} from "@mui/icons-material";
import { useState } from "react";
import AddBooksHeader from "./AddBooksHeader";
import { zodResolver } from "@hookform/resolvers/zod";
import FormActionButtons from "../FormActionButtons";
import {
  BookshelfBooksFormValues,
  BookshelfDetailsFormValues,
  BookshelfMutationRequest,
  createBookshelfBooksSchema,
} from "../../../../features/bookshelf/bookshelfModels";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../../features/bookshelf/bookshelfClient";
import BookshelfBookFormFields from "./BookshelfBookFormFields";
import { useBookshelfPageContext } from "../../BookshelfPageContext";
import { toBookshelfMutationRequest } from "../../../../features/bookshelf/bookshelfMappers";

type AddBooksStepProps = {
  previousStep: () => void;
  bookshelfDetails: BookshelfDetailsFormValues;
} & Pick<DialogProps, "onClose">;

export default function AddBooksStep({
  previousStep,
  bookshelfDetails,
}: AddBooksStepProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf, setIsBookshelfFormOpen } =
    useBookshelfPageContext();

  const form = useForm<BookshelfBooksFormValues>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(createBookshelfBooksSchema(isPlLanguage)),
  });

  const { fields, append, remove } = useFieldArray<
    BookshelfBooksFormValues,
    "books",
    "fieldKey"
  >({
    name: "books",
    control: form.control,
    keyName: "fieldKey",
  });

  const [expandedBookIndex, setExpandedBookIndex] = useState<number | null>(
    null,
  );

  const { mutate: createBookshelf, isPending: isCreating } =
    useCreateBookshelf();
  const { mutate: updateBookshelf, isPending: isUpdating } =
    useUpdateBookshelf();

  const handleToggle = (index: number) =>
    setExpandedBookIndex(expandedBookIndex === index ? null : index);

  const onSubmit = async (bookForm: BookshelfBooksFormValues) => {
    const bookshelf: BookshelfMutationRequest = toBookshelfMutationRequest({
      ...bookshelfDetails,
      books: bookForm.books,
    });
    if (currentBookshelf) {
      updateBookshelf({
        bookshelfId: currentBookshelf.id,
        bookshelf,
      });
    } else {
      createBookshelf(bookshelf);
    }
    setIsBookshelfFormOpen(false);
  };
  console.log("form", form.watch());
  return (
    <FormProvider {...form}>
      <Stack
        spacing={2}
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <AddBooksHeader
          booksLength={fields.length}
          onClickAddBook={() => {
            // @ts-ignore
            append({ book: { title: "" } });
            setExpandedBookIndex(fields.length);
          }}
        />

        {fields.map((field, index) => (
          <Card key={field.fieldKey} variant="outlined">
            <CardContent sx={{ pb: 1 }}>
              <Stack
                direction="row"
                alignItems="center"
                onClick={() => handleToggle(index)}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                <BookIcon sx={{ mr: 1, color: "primary.main" }} />
                <Typography variant="subtitle1" sx={{ flexGrow: 1 }}>
                  {field?.book.title ||
                    `${isPlLanguage ? "Książka" : "Book"} ${index + 1}`}
                </Typography>
                <IconButton size="small">
                  {expandedBookIndex === index ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </Stack>

              <Collapse in={expandedBookIndex === index}>
                <BookshelfBookFormFields index={index} />
              </Collapse>
            </CardContent>

            {expandedBookIndex === index && (
              <CardActions sx={{ justifyContent: "flex-end", pt: 0, mt: 2 }}>
                <Button
                  variant="contained"
                  size="small"
                  color="error"
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    remove(index);
                    setExpandedBookIndex(null);
                  }}
                >
                  {isPlLanguage ? "Usuń książkę" : "Remove book"}
                </Button>
              </CardActions>
            )}
          </Card>
        ))}
        <FormActionButtons
          cancelBtnProps={{
            onClick: previousStep,
            children: isPlLanguage ? "Wstecz" : "Previous",
            disabled: isCreating || isUpdating,
          }}
          submitBtnProps={{
            type: "submit",
            children: isPlLanguage ? "Zapisz" : "Save",
            loading: isCreating || isUpdating,
          }}
        />
      </Stack>
    </FormProvider>
  );
}
