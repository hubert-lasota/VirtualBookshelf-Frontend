import { FormControl, InputLabel, Select, SelectProps } from "@mui/material";

export default function SimpleSelect({
  label,
  value,
  multiple,
  ...props
}: SelectProps) {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Select
        value={value ?? (multiple ? [] : "")}
        multiple={multiple}
        label={label}
        {...props}
      />
    </FormControl>
  );
}
