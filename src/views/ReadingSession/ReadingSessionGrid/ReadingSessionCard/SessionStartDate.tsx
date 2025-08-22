import { Stack, Typography } from "@mui/material";
import { useReadingSessionContext } from "./ReadingSessionContext";
import { CalendarIcon } from "lucide-react";

export default function SessionStartDate() {
  const {
    durationRange: { startedAt },
  } = useReadingSessionContext();

  return (
    <Stack direction="row" spacing={0.5} alignItems="center">
      <CalendarIcon style={{ width: "16px", height: "16px" }} />
      <Typography variant="inherit" color="inherit">
        {new Date(startedAt).toLocaleDateString()}
      </Typography>
    </Stack>
  );
}
