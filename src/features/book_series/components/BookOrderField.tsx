import { Button, Stack } from "@mui/material";
import { useUserContext } from "../../user/UserContext";
import ControlledNumberField from "../../../common/components/FormInput/ControlledNumberField";

type BookSeriesBookOrderTextFieldProps = {
  name: string;
  remove: () => void;
};

export default function BookOrderField({
  name,
  remove,
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
      />
      <Button sx={{ width: "20%" }} color="error" onClick={remove}>
        {isPlLanguage ? "Usuń" : "Remove"}
      </Button>
    </Stack>
  );
}
