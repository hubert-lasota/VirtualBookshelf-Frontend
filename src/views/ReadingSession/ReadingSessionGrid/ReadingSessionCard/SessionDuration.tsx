import { useReadingSessionContext } from "./ReadingSessionContext";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { Stack, Typography } from "@mui/material";
import { ClockIcon } from "lucide-react";

dayjs.extend(duration);

export default function SessionDuration() {
  const { durationRange } = useReadingSessionContext();

  const dur = dayjs.duration(durationRange.readMinutes, "minutes");
  const hours = dur.hours();
  const minutes = dur.minutes();

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <ClockIcon style={{ width: "16px", height: "16px" }} />
      <Typography variant="inherit" color="inherit">
        {hours > 0 && `${hours}h `}
        {`${minutes}min`}
      </Typography>
    </Stack>
  );
}
