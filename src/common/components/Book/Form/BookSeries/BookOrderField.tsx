import { Button, Stack } from "@mui/material";
import { useUserContext } from "../../../../auth/UserContext";
import ControlledNumberField from "../../../FormInput/ControlledNumberField";

type BookSeriesBookOrderTextFieldProps = {
  name: string;
  remove: () => void;
  disabled?: boolean;
};

export default function BookOrderField({
  name,
  remove,
  disabled,
}: BookSeriesBookOrderTextFieldProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack direction="row" sx={{ width: "50%" }} spacing={1}>
      <ControlledNumberField
        name={name}
        fullWidth={false}
        sx={{ width: "90%" }}
        label={isPlLanguage ? "Kolejność" : "Order"}
        disabled={disabled}
      />
      <Button
        sx={{ width: "20%" }}
        color="error"
        onClick={remove}
        disabled={disabled}
      >
        {isPlLanguage ? "Usuń" : "Remove"}
      </Button>
    </Stack>
  );
}
