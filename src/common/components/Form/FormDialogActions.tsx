import SubmitButton, { SubmitButtonProps } from "../Button/SubmitButton";
import CancelButton from "../Button/CancelButton";
import CommonDialogActions from "../Dialog/CommonDialogActions";
import { useDialogContext } from "../../context/DialogContext";

export type FormDialogActionsProps = {
  submitButtonProps?: SubmitButtonProps;
};

export default function FormDialogActions({
  submitButtonProps,
}: FormDialogActionsProps) {
  const { onClose } = useDialogContext();
  return (
    <CommonDialogActions>
      <CancelButton onClick={onClose} />
      <SubmitButton {...submitButtonProps} />
    </CommonDialogActions>
  );
}
