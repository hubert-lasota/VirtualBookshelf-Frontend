import {
  InputAdornment,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useUserContext } from "../../../auth/UserContext";
import { mergeSx } from "../../../utils";

const searchTextFieldSx: SxProps<Theme> = (theme) => ({
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
});

export default function ToolbarSearchTextField({
  sx,
  ...props
}: TextFieldProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <TextField
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
        },
      }}
      placeholder={isPlLanguage ? "Szukaj" : "Search"}
      sx={mergeSx(searchTextFieldSx, sx)}
      {...props}
    />
  );
}
