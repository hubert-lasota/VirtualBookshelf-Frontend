import { Button } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import ChallengeFormDialog from "../ChallengeForm/ChallengeFormDialog";
import { useState } from "react";

export default function AddChallengeButton() {
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
        {isPlLanguage ? "Dodaj wyzwanie" : "Add challenge"}
      </Button>
      <ChallengeFormDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
