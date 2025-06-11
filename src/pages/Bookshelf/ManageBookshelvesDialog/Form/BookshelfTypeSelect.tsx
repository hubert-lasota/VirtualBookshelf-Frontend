import {
  FormControl,
  FormControlProps,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectProps,
} from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import { BookshelfType } from "../../../../features/bookshelf/models";
import { forwardRef, ReactNode } from "react";

type BookshelfTypeSelectProps = Pick<SelectProps, "value" | "onChange"> & {
  label: ReactNode;
  helperText: string;
} & FormControlProps;

const BookshelfTypeSelect = forwardRef<
  HTMLSelectElement,
  BookshelfTypeSelectProps
>(({ value, onChange, label, helperText, ...props }, ref) => {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const items = [
    {
      value: BookshelfType.TO_READ,
      label: isPlLanguage ? "Do przeczytania" : "To read",
    },
    {
      value: BookshelfType.READING,
      label: isPlLanguage ? "W trakcie czytania" : "Reading",
    },
    {
      value: BookshelfType.READ,
      label: isPlLanguage ? "Przeczytane" : "Read",
    },
  ];

  return (
    <FormControl variant="outlined" {...props}>
      <InputLabel id="bookshelf-type-select-label">{label}</InputLabel>
      <Select
        ref={ref}
        value={value || ""}
        onChange={onChange}
        labelId="bookshelf-type-select-label"
        label={label}
      >
        {items.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
});

export default BookshelfTypeSelect;
