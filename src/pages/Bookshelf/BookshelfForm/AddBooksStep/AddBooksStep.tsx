import {
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
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
import AddBooksFields from "./AddBooksFields";
import AddBooksHeader from "./AddBooksHeader";
import { createBookSchema } from "../../../../features/book/models";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

export default function AddBooksStep() {
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
  console.log("form", form.watch());
  const [expandedBookIndex, setExpandedBookIndex] = useState<number | null>(
    null,
  );

  const handleToggle = (index: number) =>
    setExpandedBookIndex(expandedBookIndex === index ? null : index);

  return (
    <FormProvider {...form}>
      <Stack spacing={2}>
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
                <AddBooksFields index={index} />
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
      </Stack>
    </FormProvider>
  );
}
