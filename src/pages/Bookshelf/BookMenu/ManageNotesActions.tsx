import { Button, DialogActions } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import CancelButton from "../../../common/components/ui/Button/CancelButton";

type ManageNotesActionsProps = {
  onClose: () => void;
  saved: boolean;
};

export default function ManageNotesActions({
  onClose,
  saved,
}: ManageNotesActionsProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <DialogActions>
      <CancelButton onClick={onClose} />
      <Button variant="contained" type="submit">
        {saved
          ? isPlLanguage
            ? "Zapisano..."
            : "Saved..."
          : isPlLanguage
            ? "Zapisz"
            : "Save"}
      </Button>
    </DialogActions>
  );
}
