import { Button, DialogActions, DialogProps } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";

type ManageNotesActionsProps = Pick<DialogProps, "onClose"> & {
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
      {/*@ts-ignore*/}
      <Button onClick={onClose}>{isPlLanguage ? "Anuluj" : "Cancel"}</Button>
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
