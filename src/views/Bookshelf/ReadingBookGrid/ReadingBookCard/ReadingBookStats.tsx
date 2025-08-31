import { useReadingBookContext } from "./ReadingBookContext";
import { Stack, Typography } from "@mui/material";
import { BookOpenTextIcon, CalendarIcon, StickyNoteIcon } from "lucide-react";

export default function ReadingBookStats() {
  const { durationRange, totalNotes, totalSessions } = useReadingBookContext();

  const items = [
    {
      icon: StickyNoteIcon,
      text: totalNotes,
    },
    {
      icon: BookOpenTextIcon,
      text: totalSessions,
    },
  ];

  const startAtText = durationRange?.startedAt
    ? new Date(durationRange.startedAt).toLocaleDateString()
    : "";
  const finishedAtText = durationRange?.finishedAt
    ? new Date(durationRange.finishedAt).toLocaleDateString()
    : "";
  return (
    <Stack spacing={0.5}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={0.5}
        sx={(theme) => ({ color: theme.palette.text.secondary })}
      >
        <CalendarIcon style={{ width: "16px" }} />
        <Typography variant="overline">
          {startAtText + (finishedAtText ? " - " + finishedAtText : "")}
        </Typography>
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        {items.map(({ icon: Icon, text }) => (
          <Stack
            direction="row"
            alignItems="center"
            spacing={0.5}
            key={text}
            sx={(theme) => ({ color: theme.palette.text.secondary })}
          >
            <Icon style={{ width: "16px" }} />
            <Typography variant="overline">{text}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
