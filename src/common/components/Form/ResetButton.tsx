import { useFormContext } from "react-hook-form";
import { useUserContext } from "../../auth/UserContext";
import { Button } from "@mui/material";

export default function ResetButton() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    reset,
    formState: { defaultValues },
  } = useFormContext();

  return (
    <Button onClick={() => reset(defaultValues)}>
      {isPlLanguage ? "Resetuj" : "Reset"}
    </Button>
  );
}
