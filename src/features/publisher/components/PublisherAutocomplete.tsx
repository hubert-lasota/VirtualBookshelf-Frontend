import { useController } from "react-hook-form";
import {
  Autocomplete,
  AutocompleteChangeReason,
  AutocompleteInputChangeReason,
  TextField,
} from "@mui/material";
import { useGetPublishers } from "../publisherClient";
import { PublisherResponse } from "../models";
import { useUserContext } from "../../user/UserContext";
import OptionalLabel from "../../../common/components/Label/OptionalLabel";

type PublisherAutocompleteProps = {
  name: string;
};

type AutocompleteValue = PublisherResponse | { name: string };

export default function PublisherAutocomplete({
  name,
}: PublisherAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    field: { value, onChange, ...restFieldProps },
    fieldState: { error, invalid },
  } = useController({ name });
  const { data: { publishers = [] } = {} } = useGetPublishers();

  const handleChange = (
    value: string | AutocompleteValue | null,
    reason: AutocompleteChangeReason,
  ) => {
    const newValue =
      reason === "createOption" && value !== null ? { name: value } : value;
    onChange(newValue);
  };

  const handleInputChange = (
    value: string,
    reason: AutocompleteInputChangeReason,
  ) => {
    if (reason === "input") {
      const publisher = publishers.find((p) => p.name === value);
      const newValue = publisher ? publisher : { name: value };
      onChange(newValue);
    }
  };

  return (
    <Autocomplete<AutocompleteValue, false, false, true>
      {...restFieldProps}
      freeSolo
      value={value || ""}
      getOptionLabel={(value) => (value as AutocompleteValue)?.name || ""}
      onChange={(_e, value, reason) => handleChange(value, reason)}
      options={publishers}
      onInputChange={(_e, value, reason) => handleInputChange(value, reason)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={invalid}
          helperText={invalid ? error?.message : undefined}
          label={
            <OptionalLabel text={isPlLanguage ? "Wydawnictwo" : "Publisher"} />
          }
        />
      )}
    />
  );
}
