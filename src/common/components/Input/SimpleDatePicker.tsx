import { useUserContext } from "../../auth/UserContext";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DatePicker,
  DatePickerProps,
  LocalizationProvider,
} from "@mui/x-date-pickers";

type Props = {
  value?: string;
  onChange: (date?: string) => void;
} & Omit<DatePickerProps, "value" | "onChange">;

export default function SimpleDatePicker({ value, onChange, ...props }: Props) {
  const {
    preferences: { languageCode },
  } = useUserContext();

  dayjs.locale(languageCode);

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
          },
        }}
        {...props}
      />
    </LocalizationProvider>
  );
}
