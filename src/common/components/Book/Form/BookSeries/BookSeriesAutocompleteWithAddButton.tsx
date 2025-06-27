import { Button, Stack } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { useUserContext } from "../../../../auth/UserContext";
import BookOrderField from "./BookOrderField";
import BookSeriesAutocomplete from "./BookSeriesAutocomplete";

type BookSeriesAutocompleteProps = {
  namePrefix?: string;
  disabled?: boolean;
};

export default function BookSeriesAutocompleteWithAddButton({
  namePrefix = "",
  disabled = false,
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
        onClick={() => append({ name: "" }, { shouldFocus: false })}
        disabled={disabled}
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
            disabled={disabled}
          />

          <BookOrderField
            name={namePrefix + `series.${index}.bookOrder`}
            remove={() => remove(index)}
            disabled={disabled}
          />
        </Stack>
      ))}
    </>
  );
}
