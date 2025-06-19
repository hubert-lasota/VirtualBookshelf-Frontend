import { useController } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteChangeReason,
  TextField,
} from "@mui/material";
import { Author, AuthorResponse } from "../authorModels";
import { useUserContext } from "../../user/UserContext";
import { useGetAuthors } from "../authorClient";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";

type AuthorAutocompleteProps = {
  name: string;
};

type AutocompleteValue = Pick<Author, "fullName"> | AuthorResponse;

export default function AuthorMultipleAutocomplete({
  name,
}: AuthorAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const {
    field: { value, onChange, ...restFieldProps },
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
      freeSolo
      value={value || []}
      getOptionLabel={(option) => (option as AutocompleteValue).fullName}
      options={authors}
      onChange={(_e, value, reason) => handleChange(value, reason)}
      renderInput={(params) => (
        <TextField
          {...params}
          label={
            <RequiredLabel
              text={isPlLanguage ? "Autor (Lista)" : "Author (List)"}
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
