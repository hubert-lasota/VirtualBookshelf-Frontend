import { Autocomplete, TextField } from "@mui/material";
import { useUserContext } from "../../../auth/UserContext";
import { useController } from "react-hook-form";
import { GenreResponse } from "../../../models/genreModels";
import { useGetGenres } from "../../../api/genreClient";
import RequiredLabel from "../../ui/Label/RequiredLabel";

type GenreAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

export default function GenreAutocomplete({
  name,
  disabled,
}: GenreAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const {
    field: { value, onChange, ref, ...restFieldProps },
    fieldState,
  } = useController({ name });

  const { data: { genres = [] } = {} } = useGetGenres();

  return (
    <Autocomplete<GenreResponse, true, false, false>
      {...restFieldProps}
      disabled={disabled}
      multiple
      value={
        value
          ? value.map((id: number) => genres.find((genre) => genre.id === id))
          : []
      }
      getOptionLabel={(option) => (option as GenreResponse).name}
      options={genres}
      onChange={(_e, value) => onChange(value.map((genre) => genre.id))}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={ref}
          label={
            <RequiredLabel
              text={isPlLanguage ? "Gatunek (Lista)" : "Genre (List)"}
            />
          }
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
