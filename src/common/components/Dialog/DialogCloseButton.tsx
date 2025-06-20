import { DialogProps, IconButton, Tooltip } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUserContext } from "../../../features/user/UserContext";
import type { Property } from "csstype";

type DialogCloseButtonProps = {
  top?: Property.Top;
  right?: Property.Right;
} & Pick<DialogProps, "onClose">;

export default function DialogCloseButton({
  onClose,
  top = "8px",
  right = "8px",
}: DialogCloseButtonProps) {
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
          right,
          top,
          color: theme.palette.text.secondary,
        })}
      >
        <CloseIcon />
      </IconButton>
    </Tooltip>
  );
}
