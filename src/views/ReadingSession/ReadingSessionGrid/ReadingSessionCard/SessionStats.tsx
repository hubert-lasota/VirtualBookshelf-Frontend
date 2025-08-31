import { Stack } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import { useReadingSessionContext } from "./ReadingSessionContext";
import dayjs from "dayjs";
import SessionStat, { SessionStatProps } from "./SessionStat";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);

export default function SessionStats() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { durationRange, pageRange } = useReadingSessionContext();

  const dur = dayjs.duration(durationRange.readMinutes, "minutes");
  const hours = dur.hours();
  const minutes = dur.minutes();

  const hoursStr = hours > 0 ? `${hours}h ` : "";
  const minutesStr = minutes > 0 ? `${minutes}min` : "";
  const stats: SessionStatProps[] = [
    {
      value: new Date(durationRange.startedAt).toLocaleString(),
      label: isPlLanguage ? "Rozpoczęto" : "Started",
      color: "info",
    },
    {
      value: hoursStr + minutesStr,
      label: isPlLanguage ? "Czas czytania" : "Reading time",
      color: "success",
    },
    {
      value: pageRange.readPages,
      label: isPlLanguage ? "Stron przeczytano" : "Read pages",
      color: "primary",
    },
  ];

  return (
    <Stack direction="row" alignItems="center" spacing={2}>
      {stats.map((statProps) => (
        <SessionStat {...statProps} />
      ))}
    </Stack>
  );
}
