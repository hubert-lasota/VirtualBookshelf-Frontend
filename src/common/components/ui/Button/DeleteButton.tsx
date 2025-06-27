import { useUserContext } from "../../../auth/UserContext";
import { Button, ButtonProps } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function DeleteButton({ children, ...props }: ButtonProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Button startIcon={<DeleteIcon />} color="error" {...props}>
      {children || isPlLanguage ? "Usuń" : "Delete"}
    </Button>
  );
}
