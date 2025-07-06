import { useUserContext } from "../../../common/auth/UserContext";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBookshelvesViewContext } from "./BookshelvesViewContext";

export default function SearchTextField() {
  const { query, onQueryChange } = useBookshelvesViewContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <TextField
      size="small"
      sx={{ width: "35%" }}
      placeholder={isPlLanguage ? "Szukaj książek..." : "Search books..."}
      value={query}
      onChange={(e) => onQueryChange(e.target.value)}
      slotProps={{
        input: {
          sx: (theme) => ({
            backgroundImage: theme.palette.background.defaultGradient,
            borderRadius: theme.spacing(1.5),
          }),
          startAdornment: <SearchIcon sx={{ marginRight: "0.4rem" }} />,
        },
      }}
    />
  );
}
