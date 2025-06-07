import { DialogProps, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../features/user/UserContext";

export default function DialogCloseButton({
  onClose,
}: Pick<DialogProps, "onClose">) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Tooltip title={isPlLanguage ? "Zamknij" : "Close"}>
      {/*@ts-ignore*/}
      <IconButton
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.text.secondary,
        })}
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
}
