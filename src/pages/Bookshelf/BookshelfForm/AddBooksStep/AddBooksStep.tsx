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
import { createBookSchema } from "../../../../features/book/bookModels";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import BookFormFields from "../../../../features/book/components/BookFormFields";
import FormActionButtons from "../FormActionButtons";
import {
  BookshelfDetails,
  BookshelfFormValues,
} from "../../../../features/bookshelf/bookshelfModels";
import {
  useCreateBookshelf,
  useUpdateBookshelf,
} from "../../../../features/bookshelf/bookshelfClient";

type AddBooksStepProps = {
  previousStep: () => void;
  bookshelfDetails: BookshelfDetails;
  bookshelfId?: number;
} & Pick<DialogProps, "onClose">;

export default function AddBooksStep({
  previousStep,
  onClose,
  bookshelfDetails,
  bookshelfId,
}: AddBooksStepProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const bookFormSchema = z.object({
    books: z.array(createBookSchema(isPlLanguage)).optional(),
  });

  type BookForm = z.infer<typeof bookFormSchema>;

  const form = useForm<BookForm>({
    mode: "all",
    reValidateMode: "onChange",
    resolver: zodResolver(bookFormSchema),
  });

  const { fields, append, remove } = useFieldArray<
    BookForm,
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

  const onSubmit = async (bookForm: BookForm) => {
    const bookshelf: BookshelfFormValues = {
      ...bookshelfDetails,
      books: bookForm.books || [],
    };
    if (bookshelfId) {
      updateBookshelf({ id: bookshelfId, ...bookshelf });
    } else {
      createBookshelf(bookshelf);
    }
    // @ts-ignore
    onClose();
  };

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
            append({ title: "" });
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
                  {field?.title ||
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
                <BookFormFields namePrefix={`books.${index}.`} />
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
