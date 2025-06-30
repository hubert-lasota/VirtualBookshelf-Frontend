import { useController } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { Author, AuthorResponse } from "../../../models/authorModels";
import { useUserContext } from "../../../auth/UserContext";
import { useGetAuthors } from "../../../api/clients/authorClient";
import RequiredLabel from "../../ui/Label/RequiredLabel";

type AuthorAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

type AutocompleteValue = Pick<Author, "fullName"> | AuthorResponse;

export default function AuthorAutocomplete({
  name,
  disabled,
}: AuthorAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    field: { value, onChange, ref, ...restFieldProps },
    fieldState,
  } = useController({ name });

  const { data: { authors = [] } = {} } = useGetAuthors();

  const handleChange = (
    value: (string | AutocompleteValue)[] | null,
    reason: AutocompleteChangeReason,
  ) => {
    if (reason === "createOption" && value !== null) {
      const newValues = [...value];
      const lastIndex = newValues.length - 1;
      newValues[lastIndex] = { fullName: newValues[lastIndex] as string };
      onChange(newValues);
    } else {
      onChange(value);
    }
  };

  return (
    <Autocomplete<AutocompleteValue, true, false, true>
      {...restFieldProps}
      disabled={disabled}
      freeSolo
      multiple
      value={value || []}
      getOptionLabel={(option) => (option as AutocompleteValue).fullName}
      options={authors}
      onChange={(_e, value, reason) => handleChange(value, reason)}
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={ref}
          label={
            <RequiredLabel
              text={isPlLanguage ? "Autor (Lista)" : "Author (List)"}
            />
          }
          error={fieldState.invalid}
          helperText={fieldState.error?.message}
        />
      )}
    />
  );
}
