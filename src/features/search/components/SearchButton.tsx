import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useUserContext } from "../../user/UserContext";
import SearchDialog from "./SearchDialog";

export default function SearchButton() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsDialogOpen(true)}
        startIcon={<SearchIcon />}
        sx={(theme) => ({ color: theme.palette.text.primary })}
      >
        {isPlLanguage ? "Szukaj" : "Search"}
      </Button>
      <SearchDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
