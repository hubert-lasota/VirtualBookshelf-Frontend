import { Button, ButtonProps } from "@mui/material";
import { useUserContext } from "../../../auth/UserContext";
import { useFormContext } from "react-hook-form";

type SubmitButtonProps = { isUpdating?: boolean } & ButtonProps;

export default function SubmitButton({
  isUpdating = false,
  children,
  ...props
}: SubmitButtonProps) {
  const {
    formState: { isSubmitting },
  } = useFormContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const buttonText = isUpdating
    ? isPlLanguage
      ? "Edytuj"
      : "Edit"
    : isPlLanguage
      ? "Dodaj"
      : "Add";

  return (
    <Button variant="contained" type="submit" loading={isSubmitting} {...props}>
      {children ?? buttonText}
    </Button>
  );
}
