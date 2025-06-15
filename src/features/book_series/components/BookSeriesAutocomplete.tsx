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
    fieldState: { error },
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
        const { bookOrder } = getValues(name);
        const newValue =
          reason === "createOption" && value !== null
            ? { name: value, bookOrder }
            : { ...value, bookOrder };
        onChange(newValue);
      }}
      onInputChange={(_e, value, reason) => {
        if (reason === "input") {
          const { bookOrder } = getValues(name);
          const option = series.find((series) => series.name === value);
          const newValue = option
            ? { ...option, bookOrder, name: value }
            : { bookOrder, name: value };
          onChange(newValue);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={(isPlLanguage ? "Seria" : "Series") + ` (${index + 1})`}
          //@ts-ignore
          error={!!error?.name?.message}
          //@ts-ignore
          helperText={error?.name?.message}
        />
      )}
    />
  );
}
