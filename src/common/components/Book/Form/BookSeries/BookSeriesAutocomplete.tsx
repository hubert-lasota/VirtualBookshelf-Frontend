import { Autocomplete, TextField } from "@mui/material";
import { useController, useFormContext } from "react-hook-form";
import { useUserContext } from "../../../../auth/UserContext";
import { useGetBookSeries } from "../../../../api/bookSeriesClient";

type BookSeriesNameAutocompleteProps = {
  name: string;
  index: number;
  disabled?: boolean;
};

export default function BookSeriesAutocomplete({
  name,
  index,
  disabled = false,
}: BookSeriesNameAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    field: { value, onChange, ref, disabled: fieldDisabled, ...restFieldProps },
    fieldState: { error },
  } = useController({ name });

  const { getValues } = useFormContext();

  const { data: { series = [] } = {} } = useGetBookSeries();

  return (
    <Autocomplete
      {...restFieldProps}
      disabled={disabled || fieldDisabled}
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
          inputRef={ref}
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
