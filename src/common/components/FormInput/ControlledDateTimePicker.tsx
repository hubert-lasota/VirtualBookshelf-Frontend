import {
  DateTimePicker,
  DateTimePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { useUserContext } from "../../auth/UserContext";
import dayjs from "dayjs";
import { useController } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type ControlledDateTimePickerProps = {
  name: string;
} & DateTimePickerProps;

export default function ControlledDateTimePicker({
  name,
  ...props
}: ControlledDateTimePickerProps) {
  const {
    preferences: { languageCode, isPlLanguage },
  } = useUserContext();

  dayjs.locale(languageCode);

  const {
    field: { value, onChange, onBlur, ref, ...restFieldProps },
    fieldState: { invalid, error },
  } = useController({ name });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={languageCode}
      localeText={{ cancelButtonLabel: isPlLanguage ? "Anuluj" : "Cancel" }}
    >
      <DateTimePicker
        value={value ? dayjs(value) : null}
        onChange={(value) => onChange(value?.toISOString())}
        inputRef={ref}
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
