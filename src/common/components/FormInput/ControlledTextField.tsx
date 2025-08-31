import { TextField, TextFieldProps } from "@mui/material";
import { useController } from "react-hook-form";

type ControlledTextFieldProps = {
  name: string;
  shouldUnregister?: boolean;
} & Omit<TextFieldProps, "value" | "onChange" | "name">;

export default function ControlledTextField({
  name,
  shouldUnregister,
  ...rest
}: ControlledTextFieldProps) {
  const {
    field: { value, ref, ...restFieldProps },
    fieldState: { error, invalid },
  } = useController({ name, shouldUnregister });

  return (
    <TextField
      inputRef={ref}
      fullWidth
      {...rest}
      {...restFieldProps}
      value={value || ""}
      error={invalid}
      helperText={error?.message}
    />
  );
}
