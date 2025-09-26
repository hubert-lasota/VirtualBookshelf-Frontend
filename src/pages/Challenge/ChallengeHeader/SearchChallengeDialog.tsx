import { useUserContext } from "../../../common/auth/UserContext";
import { Dialog, DialogContent } from "@mui/material";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";

type SearchChallengeDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function SearchChallengeDialog({
  open,
  onClose,
}: SearchChallengeDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: {
          sx: { minHeight: "80%", minWidth: "65%" },
        },
      }}
    >
      <DialogTitleWithCloseButton onClose={onClose}>
        {isPlLanguage ? "Szukaj wyzwania" : "Search challenge"}
      </DialogTitleWithCloseButton>
      <DialogContent dividers></DialogContent>
    </Dialog>
  );
}
