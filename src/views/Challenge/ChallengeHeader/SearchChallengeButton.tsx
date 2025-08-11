import { useUserContext } from "../../../common/auth/UserContext";
import { Button } from "@mui/material";
import SearchChallengeDialog from "./SearchChallengeDialog";
import { useState } from "react";

export default function SearchChallengeButton() {
  const [open, setOpen] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <>
      <Button
        variant="contained"
        size="small"
        sx={{ fontSize: "1rem" }}
        onClick={() => setOpen(true)}
      >
        {isPlLanguage ? "Dołącz do wyzwania" : "Join challenge"}
      </Button>
      <SearchChallengeDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
