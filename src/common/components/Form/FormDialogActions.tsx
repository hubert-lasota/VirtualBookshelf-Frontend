import SubmitButton, { SubmitButtonProps } from "./SubmitButton";
import CancelButton from "../Button/CancelButton";
import CommonDialogActions from "../Dialog/CommonDialogActions";
import { useDialogContext } from "../../context/DialogContext";
import ResetButton from "./ResetButton";
import { Stack } from "@mui/material";

export type FormDialogActionsProps = {
  submitButtonProps?: SubmitButtonProps;
  showResetButton?: boolean;
};

export default function FormDialogActions({
  submitButtonProps,
  showResetButton = false,
}: FormDialogActionsProps) {
  const { onClose } = useDialogContext();

  return (
    <CommonDialogActions
      sx={{ justifyContent: showResetButton ? "space-between" : "flex-end" }}
    >
      {showResetButton ? <ResetButton /> : null}
      <Stack direction="row" spacing={1.5} justifyContent="flex-end">
        <CancelButton onClick={onClose} />
        <SubmitButton {...submitButtonProps} />
      </Stack>
    </CommonDialogActions>
  );
}
