import {
  Dialog,
  DialogContent,
  DialogProps,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";
import DialogCloseButton from "../../../common/DialogCloseButton";
import { useUserContext } from "../../../features/user/UserContext";
import ManageBookshelvesHeader from "./ManageBookshelvesHeader";

export default function ManageBookshelvesDialog({
  open,
  onClose,
}: Pick<DialogProps, "open" | "onClose">) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      sx={(theme) => ({
        "& .MuiPaper-root": {
          borderRadius: theme.spacing(0.5),
          width: "75%",
          height: "75%",
        },
      })}
    >
      <ManageBookshelvesHeader onClose={onClose} />
      <Stack
        sx={(theme) => ({
          width: "100%",
          height: "100%",
          backgroundColor: "#f1f3fa",
          padding: theme.spacing(2),
        })}
      ></Stack>
    </Dialog>
  );
}
