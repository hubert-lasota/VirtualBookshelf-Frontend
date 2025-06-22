import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  Select,
  SelectProps,
} from "@mui/material";
import { useController } from "react-hook-form";

type ControlledSelectProps = Omit<
  SelectProps,
  "value" | "onChange" | "name"
> & {
  name: string;
  formControlProps?: FormControlProps;
};

export default function ControlledSelect({
  name,
  children,
  label,
  formControlProps,
  ...rest
}: ControlledSelectProps) {
  const {
    field: { value, ref, ...restFieldProps },
    fieldState: { invalid, error },
  } = useController({ name });

  return (
    <FormControl
      variant="outlined"
      error={invalid}
      fullWidth
      {...formControlProps}
    >
      <InputLabel>{label}</InputLabel>
      <Select
        inputRef={ref}
        label={label}
        {...restFieldProps}
        {...rest}
        value={value || ""}
      >
        {children}
      </Select>
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
