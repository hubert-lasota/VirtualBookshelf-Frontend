import { Button, Divider, Stack, TextField } from "@mui/material";
import { useUserContext } from "../../../../../../common/auth/UserContext";
import SearchIcon from "@mui/icons-material/Search";

type NoteToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onAddNote: () => void;
};

export default function NoteToolbar({
  query,
  onQueryChange,
  onAddNote,
}: NoteToolbarProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <>
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", paddingBottom: "1rem" }}
      >
        <TextField
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          slotProps={{
            input: { startAdornment: <SearchIcon /> },
          }}
          placeholder={
            isPlLanguage ? "Szukaj w notatkach..." : "Search in notes..."
          }
        />
        <Button onClick={onAddNote} variant="contained">
          {isPlLanguage ? "Dodaj notatkę" : "Add note"}
        </Button>
      </Stack>
      <Divider />
    </>
  );
}
