import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { useUserContext } from "../../user/UserContext";
import { useController } from "react-hook-form";
import { GenreResponse } from "../models";
import { useGetGenres } from "../genreClient";
import OptionalLabel from "../../../common/components/Label/OptionalLabel";

type AutocompleteValue = Pick<GenreResponse, "name"> | GenreResponse;

type GenreAutocompleteProps = {
  name: string;
};

export default function GenreAutocomplete({ name }: GenreAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const {
    field: { value, onChange, ...restFieldProps },
    fieldState,
  } = useController({ name });

  const { data: { genres = [] } = {} } = useGetGenres();

  const handleChange = (
    value: (string | AutocompleteValue)[] | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (reason === "createOption" && value !== null) {
      const newValues = [...value];
      const lastIndex = newValues.length - 1;
      newValues[lastIndex] = { name: newValues[lastIndex] as string };
      onChange(newValues);
    } else {
      onChange(value);
    }
  };

  return (
    <Autocomplete<AutocompleteValue, true, false, true>
      {...restFieldProps}
      freeSolo
      value={value || ""}
      getOptionLabel={(option) => (option as AutocompleteValue).name}
      options={genres}
      onChange={(_e, value, reason) => handleChange(value, reason)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            <OptionalLabel
              text={isPlLanguage ? "Gatunek (Lista)" : "Genre (List)"}
            />
          }
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
      //@ts-ignore
      multiple
    />
  );
}
