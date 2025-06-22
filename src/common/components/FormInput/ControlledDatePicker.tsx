import { useController } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { useUserContext } from "../../../features/user/UserContext";
import "dayjs/locale/en";

type ControlledDatePickerProps = {
  name: string;
} & DatePickerProps;

export default function ControlledDatePicker({
  name,
  ...props
}: ControlledDatePickerProps) {
  const {
    preferences: { languageCode },
  } = useUserContext();

  dayjs.locale(languageCode);

  const {
    field: { value, onChange, onBlur, ...restFieldProps },
    fieldState: { invalid, error },
  } = useController({ name });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={languageCode}
    >
      <DatePicker
        value={value ? dayjs(value) : null}
        onChange={(value) => onChange(value?.toISOString())}
        slotProps={{
          textField: {
            fullWidth: true,
            onBlur,
            error: invalid,
            helperText: error?.message,
          },
        }}
        {...restFieldProps}
        {...props}
      />
    </LocalizationProvider>
  );
}
