import ISO6391 from "iso-639-1";
import { useController } from "react-hook-form";
import { Autocomplete, TextField } from "@mui/material";
import { useMemo } from "react";
import { useUserContext } from "../../auth/UserContext";
import RequiredLabel from "../Label/RequiredLabel";

type LanguageAutocompleteProps = {
  name: string;
  disabled?: boolean;
};

const codes = ISO6391.getAllCodes();

export default function LanguageAutocomplete({
  name,
  disabled,
}: LanguageAutocompleteProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    field: { value, onChange, ref, ...restFieldProps },
    fieldState: { invalid, error },
  } = useController({ name });

  const options = useMemo(() => {
    const display = new Intl.DisplayNames([isPlLanguage ? "pl" : "en"], {
      type: "language",
    });
    return codes
      .map((code) => ({
        code,
        label: display.of(code),
      }))
      .filter(({ code, label }) => label && label !== code)
      .sort((a, b) =>
        a.label!.localeCompare(b.label!, isPlLanguage ? "pl" : "en"),
      );
  }, [isPlLanguage]);

  return (
    <Autocomplete
      {...restFieldProps}
      disabled={disabled}
      // @ts-ignore
      value={options.find((opt) => opt.code === value) || ""}
      onChange={(_e, value) => onChange(value?.code)}
      filterOptions={(options, state) =>
        options.filter((opt) =>
          // @ts-ignore
          opt.label.toLowerCase().includes(state.inputValue.toLowerCase()),
        )
      }
      renderInput={(params) => (
        <TextField
          {...params}
          inputRef={ref}
          error={invalid}
          helperText={error?.message}
          label={<RequiredLabel text={isPlLanguage ? "Język" : "Language"} />}
        />
      )}
      getOptionLabel={(value) => value?.label || ""}
      options={options}
    />
  );
}
