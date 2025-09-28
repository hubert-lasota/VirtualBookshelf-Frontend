import { Button, Stack } from "@mui/material";
import { useUserContext } from "../../../../../../common/auth/UserContext";
import Toolbar from "../../../../../../common/components/Toolbar/Toolbar";

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
    <Toolbar
      filterButtonProps={{
        onReset: () => {},
        onApply: () => {},
        content: "",
      }}
      searchTextFieldProps={{
        value: query,
        onChange: (e) => onQueryChange(e.target.value),
        placeholder: isPlLanguage ? "Szukaj notatki..." : "Search notes...",
      }}
    >
      <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%" }}>
        <Button onClick={onAddNote} variant="contained">
          {isPlLanguage ? "Dodaj notatkę" : "Add note"}
        </Button>
      </Stack>
    </Toolbar>
  );
  // return (
  //   <>
  //     <Stack
  //       direction="row"
  //       sx={{ justifyContent: "space-between", paddingBottom: "1rem" }}
  //     >
  //       <TextField
  //         value={query}
  //         onChange={(e) => onQueryChange(e.target.value)}
  //         slotProps={{
  //           input: { startAdornment: <SearchIcon /> },
  //         }}
  //         placeholder={
  //           isPlLanguage ? "Szukaj w notatkach..." : "Search in notes..."
  //         }
  //       />
  //       <Button onClick={onAddNote} variant="contained">
  //         {isPlLanguage ? "Dodaj notatkę" : "Add note"}
  //       </Button>
  //     </Stack>
  //     <Divider />
  //   </>
  // );
}
