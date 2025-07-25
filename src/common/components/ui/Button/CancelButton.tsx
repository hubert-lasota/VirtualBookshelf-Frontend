import { Button, ButtonProps } from "@mui/material";
import { useUserContext } from "../../../auth/UserContext";

export default function CancelButton({ children, ...props }: ButtonProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Button color="inherit" {...props}>
      {children || isPlLanguage ? "Anuluj" : "Cancel"}
    </Button>
  );
}
