import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Divider,
} from "@mui/material";
import { useUserContext } from "../../../features/user/UserContext";
import LanguageSelect from "./LanguageSelect";

export default function ChangeLanguageDialog({
  open,
  onClose,
}: Pick<DialogProps, "open" | "onClose">) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={{
        "& .MuiPaper-root": {
          minWidth: "45%",
        },
      }}
    >
      <DialogTitle>
        {isPlLanguage ? "Zmień język" : "Change language"}
      </DialogTitle>
      <Divider />
      <DialogContent>
        <LanguageSelect variant="outlined" fullWidth />
      </DialogContent>
    </Dialog>
  );
}
