import { Button, ButtonProps } from "@mui/material";
import { useUserContext } from "../../../auth/UserContext";

export default function SaveButton({ children, ...props }: ButtonProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Button variant="contained" type="submit" {...props}>
      {children || isPlLanguage ? "Zapisz" : "Save"}
    </Button>
  );
}
