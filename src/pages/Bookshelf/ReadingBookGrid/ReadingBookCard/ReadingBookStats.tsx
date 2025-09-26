import { useReadingBookContext } from "./ReadingBookContext";
import { Stack, Typography } from "@mui/material";
import { BookOpenTextIcon, CalendarIcon, StickyNoteIcon } from "lucide-react";
import { useUserContext } from "../../../../common/auth/UserContext";

const noteSuffix = (totalNotes: number, isPlLanguage: boolean) => {
  if (totalNotes === 1) {
    return isPlLanguage ? "notatka" : "note";
  }
  if (totalNotes === 0 || totalNotes >= 5) {
    return isPlLanguage ? "notatek" : "notes";
  }
  return isPlLanguage ? "notatki" : "notes";
};

const sessionSuffix = (totalSessions: number, isPlLanguage: boolean) => {
  if (totalSessions === 1) {
    return isPlLanguage ? "sesje czytelnicze" : "reading session";
  }
  if (totalSessions === 0 || totalSessions >= 5) {
    return isPlLanguage ? "sesji czytelniczych" : "reading sessions";
  }
  return isPlLanguage ? "sesje czytelnicze" : "reading sessions";
};

export default function ReadingBookStats() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { durationRange, totalNotes, totalSessions } = useReadingBookContext();

  const items = [
    {
      icon: BookOpenTextIcon,
      text: totalSessions + " " + sessionSuffix(totalSessions, isPlLanguage),
    },
    {
      icon: StickyNoteIcon,
      text: totalNotes + " " + noteSuffix(totalNotes, isPlLanguage),
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
            <Typography fontSize="12px">{text}</Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
