import DialogCloseButton, { DialogCloseButtonProps } from "./DialogCloseButton";
import { DialogTitle, DialogTitleProps } from "@mui/material";

type DialogTitleWithCloseButtonProps = DialogTitleProps & {
  closeButtonProps?: Omit<DialogCloseButtonProps, "onClose">;
  onClose: () => void;
};
export default function DialogTitleWithCloseButton({
  closeButtonProps,
  onClose,
  ...props
}: DialogTitleWithCloseButtonProps) {
  return (
    <>
      <DialogTitle {...props} />
      <DialogCloseButton onClose={onClose} {...closeButtonProps} />
    </>
  );
}
