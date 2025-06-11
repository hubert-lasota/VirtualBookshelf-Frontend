import {
  Accordion,
  AccordionSummary,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Bookshelf } from "../../../../features/bookshelf/models";

export default function BookshelfFormAddBooks() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { control } = useForm<Bookshelf>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "books",
  });

  return (
    <Stack spacing={2}>
      <Typography variant="h6">{isPlLanguage ? "Książki" : "Books"}</Typography>
      <Button
        variant="outlined"
        sx={{ width: "20%" }}
        onClick={() =>
          append({
            book: {
              title: "",
              isbn: "",
              authors: [],
              languageTag: "",
            },
          })
        }
      >
        {isPlLanguage ? "Dodaj" : "Add"}
      </Button>
      <Stack>
        {fields.map((field, index) => (
          <Accordion key={field.id}>
            <AccordionSummary>
              {(isPlLanguage ? "Książka" : "Book") + ` ${index + 1}`}
            </AccordionSummary>
            <Controller
              control={control}
              render={({ field }) => <TextField {...field} />}
              name={`books.${index}.book.title`}
            />
          </Accordion>
        ))}
      </Stack>
    </Stack>
  );
}
