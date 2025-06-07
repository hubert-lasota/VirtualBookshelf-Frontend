import { DialogProps, DialogTitle } from "@mui/material";
import DialogCloseButton from "../../../common/DialogCloseButton";
import { useUserContext } from "../../../features/user/UserContext";

export default function ManageBookshelvesHeader({
  onClose,
}: Pick<DialogProps, "onClose">) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <>
      <DialogTitle
        sx={(theme) => ({
          borderBottom: `1px solid ${theme.palette.divider}`,
          pb: theme.spacing(1.5),
        })}
      >
        {isPlLanguage ? "Zarządzaj regałami" : "Manage bookshelves"}
      </DialogTitle>
      <DialogCloseButton onClose={onClose} />
    </>
  );
}
