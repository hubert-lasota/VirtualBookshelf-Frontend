import { Autocomplete, TextField } from "@mui/material";
import { useUserContext } from "../../user/UserContext";
import { useController } from "react-hook-form";
import { GenreResponse } from "../genreModels";
import { useGetGenres } from "../genreClient";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";

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

  return (
    <Autocomplete<GenreResponse, true, false, false>
      {...restFieldProps}
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
          label={
            <RequiredLabel
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
