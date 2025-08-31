import { useController } from "react-hook-form";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import dayjs from "dayjs";
import "dayjs/locale/pl";
import { useUserContext } from "../../auth/UserContext";
import "dayjs/locale/en";

type ControlledDatePickerProps = {
  name: string;
  shouldUnregister?: boolean;
} & DatePickerProps;

export default function ControlledDatePicker({
  name,
  shouldUnregister,
  ...props
}: ControlledDatePickerProps) {
  const {
    preferences: { languageCode },
  } = useUserContext();

  dayjs.locale(languageCode);

  const {
    field: { value, onChange, onBlur, ref, ...restFieldProps },
    fieldState: { invalid, error },
  } = useController({ name, shouldUnregister });

  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={languageCode}
    >
      <DatePicker
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
