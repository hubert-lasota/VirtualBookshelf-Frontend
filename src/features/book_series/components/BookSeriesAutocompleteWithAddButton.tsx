import { Button, Stack } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { useUserContext } from "../../user/UserContext";
import BookOrderTextField from "./BookOrderTextField";
import BookSeriesAutocomplete from "./BookSeriesAutocomplete";

type BookSeriesAutocompleteProps = {
  namePrefix?: string;
};

export default function BookSeriesAutocompleteWithAddButton({
  namePrefix = "",
}: BookSeriesAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { fields, append, remove } = useFieldArray({
    name: namePrefix + "series",
    keyName: "key",
  });

  return (
    <>
      <Button
        sx={{ width: "100%" }}
        variant="outlined"
        onClick={() => append({ name: "" })}
      >
        {isPlLanguage ? "Dodaj serię" : "Add series"}
      </Button>

      {fields.map((field, index) => (
        <Stack
          direction="row"
          spacing={2}
          key={field.key}
          sx={{ width: "100%", mt: 1 }}
        >
          <BookSeriesAutocomplete
            name={namePrefix + `series.${index}`}
            index={index}
          />

          <BookOrderTextField
            name={namePrefix + `series.${index}.bookOrder`}
            remove={() => remove(index)}
          />
        </Stack>
      ))}
    </>
  );
}
