import { TextField, TextFieldProps } from "@mui/material";
import { useController } from "react-hook-form";

type ControlledTextFieldProps = {
  name: string;
} & Omit<TextFieldProps, "value" | "onChange" | "name">;

export default function ControlledTextField({
  name,
  ...rest
}: ControlledTextFieldProps) {
  const {
    field: { value, ...restFieldProps },
    fieldState: { error, invalid },
  } = useController({ name });

  return (
    <TextField
      fullWidth
      {...rest}
      {...restFieldProps}
      value={value || ""}
      error={invalid}
      helperText={error?.message}
    />
  );
}
