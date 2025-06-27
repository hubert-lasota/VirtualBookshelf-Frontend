import { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { Button } from "@mui/material";
import { useUserContext } from "../../auth/UserContext";
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
        color="inherit"
      >
        {isPlLanguage ? "Szukaj" : "Search"}
      </Button>
      <SearchDialog
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
      />
    </>
  );
}
