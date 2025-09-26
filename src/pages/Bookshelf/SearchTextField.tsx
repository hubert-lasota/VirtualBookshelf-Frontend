import { useUserContext } from "../../common/auth/UserContext";
import { TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useBookshelfPageContext } from "./BookshelfPageContext";

export default function SearchTextField() {
  const { query, onQueryChange } = useBookshelfPageContext();
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
            borderRadius: theme.spacing(1.5),
          }),
          startAdornment: <SearchIcon sx={{ marginRight: "0.4rem" }} />,
        },
      }}
    />
  );
}
