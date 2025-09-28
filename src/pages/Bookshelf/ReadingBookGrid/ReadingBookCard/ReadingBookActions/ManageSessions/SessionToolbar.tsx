import Toolbar from "../../../../../../common/components/Toolbar/Toolbar";
import { Button, Stack } from "@mui/material";
import { useUserContext } from "../../../../../../common/auth/UserContext";

type SessionToolbarProps = {
  query: string;
  onQueryChange: (query: string) => void;
  onAddSession: () => void;
};

export default function SessionToolbar({
  query,
  onQueryChange,
  onAddSession,
}: SessionToolbarProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Toolbar
      searchTextFieldProps={{
        value: query,
        onChange: (e) => onQueryChange(e.target.value),
        placeholder: isPlLanguage ? "Szukaj sesji..." : "Search sessions...",
      }}
      filterButtonProps={{
        onReset: () => {},
        content: "",
        onApply: () => {},
      }}
    >
      <Stack direction="row" justifyContent="flex-end" sx={{ width: "100%" }}>
        <Button variant="contained" onClick={onAddSession}>
          {isPlLanguage ? "Dodaj sesję" : "Add session"}
        </Button>
      </Stack>
    </Toolbar>
  );
}
