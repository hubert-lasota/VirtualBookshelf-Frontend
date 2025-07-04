import { useController } from "react-hook-form";
import { FormControl, FormHelperText, Rating } from "@mui/material";

export default function ControlledRating() {
  const {
    field: { value, onChange, onBlur: _onBlur, ...rest },
    fieldState: { invalid, error },
  } = useController({ name: "rating" });

  return (
    <FormControl error={invalid} fullWidth>
      <Rating
        precision={0.5}
        value={value ?? 0}
        onChange={(_event, value) => onChange(value)}
        {...rest}
      />
      <FormHelperText>{error?.message}</FormHelperText>
    </FormControl>
  );
}
