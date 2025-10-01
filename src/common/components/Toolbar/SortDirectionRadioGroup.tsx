import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useUserContext } from "../../auth/UserContext";
import { useController } from "react-hook-form";
import { ApiSort } from "../../api/apiModels";

export default function SortDirectionRadioGroup() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    field: { value, ...field },
    fieldState: { invalid, error },
  } = useController<ApiSort>({ name: "direction", defaultValue: "asc" });

  const items = [
    { value: "asc", label: isPlLanguage ? "Rosnąco" : "Ascending" },
    { value: "desc", label: isPlLanguage ? "Malejąco" : "Descending" },
  ];

  return (
    <FormControl fullWidth error={invalid}>
      <RadioGroup row value={value ?? ""} {...field}>
        {items.map(({ value, label }) => (
          <FormControlLabel
            key={value}
            value={value}
            control={<Radio />}
            label={label}
          />
        ))}
      </RadioGroup>
      {invalid && <FormHelperText>{error?.message}</FormHelperText>}
    </FormControl>
  );
}
