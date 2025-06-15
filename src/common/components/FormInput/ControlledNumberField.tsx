import { TextField, TextFieldProps } from "@mui/material";
import { useController } from "react-hook-form";
import React from "react";

type ControlledNumberFieldProps = {
  name: string;
} & Omit<TextFieldProps, "value" | "onChange" | "name" | "type">;

export default function ControlledNumberField({
  name,
  ...rest
}: ControlledNumberFieldProps) {
  const {
    field: { value, onChange, ...restFieldProps },
    fieldState: { error, invalid },
  } = useController({ name });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const num = value?.length > 0 ? Number(value) : undefined;
    onChange(num);
  };

  return (
    <TextField
      fullWidth
      value={value ?? ""}
      onChange={handleChange}
      error={invalid}
      helperText={error?.message}
      type="number"
      {...restFieldProps}
      {...rest}
    />
  );
}
