import {
  InputAdornment,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useUserContext } from "../../auth/UserContext";
import { mergeSx } from "../../utils";
import React, { useEffect, useState } from "react";
import { useDebounceValue } from "../../hooks";

const searchTextFieldSx: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
});

export type ToolbarSearchTextFieldProps = Omit<
  TextFieldProps,
  "value" | "onChange"
> & {
  endAdornment?: React.ReactNode;
  onDebounceValueChange?: (value: string) => void;
};

export default function ToolbarSearchTextField({
  sx,
  onDebounceValueChange,
  endAdornment,
  ...props
}: ToolbarSearchTextFieldProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const [value, setValue] = useState("");
  const debouncedValue = useDebounceValue<string>(value);

  useEffect(() => {
    if (onDebounceValueChange) {
      onDebounceValueChange(debouncedValue);
    }
  }, [debouncedValue]);

  return (
    <TextField
      value={value}
      onChange={(e) => setValue(e.target.value)}
      slotProps={{
        input: {
          sx: (theme) => ({
            borderRadius: theme.shape.borderRadius,
          }),
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: endAdornment ? (
            <InputAdornment position="end">{endAdornment}</InputAdornment>
          ) : undefined,
        },
      }}
      placeholder={isPlLanguage ? "Szukaj..." : "Search..."}
      sx={mergeSx(searchTextFieldSx, sx)}
      {...props}
    />
  );
}
