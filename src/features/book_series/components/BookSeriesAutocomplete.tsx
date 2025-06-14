import { Autocomplete, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { useUserContext } from "../../user/UserContext";
import { useGetBookSeries } from "../bookSeriesClient";

type BookSeriesNameAutocompleteProps = {
  name: string;
  index: number;
};

export default function BookSeriesAutocomplete({
  name,
  index,
}: BookSeriesNameAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    field: { value, onChange, ...restFieldProps },
    fieldState: { invalid, error },
  } = useController({ name });

  const { getValues } = useFormContext();

  const { data: { series = [] } = {} } = useGetBookSeries();

  return (
    <Autocomplete
      {...restFieldProps}
      sx={{ width: "80%" }}
      freeSolo
      value={value || ""}
      getOptionLabel={(value) => value?.name || ""}
      options={series}
      onChange={(_e, value, reason) => {
        console.log("value", value);
        const { bookOrder } = getValues(name);
        const newValue =
          reason === "createOption" && value !== null
            ? { name: value, bookOrder }
            : { ...value, bookOrder };
        onChange(newValue);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={(isPlLanguage ? "Seria" : "Series") + ` (${index + 1})`}
          error={invalid}
          helperText={error?.message}
        />
      )}
    />
  );
}
