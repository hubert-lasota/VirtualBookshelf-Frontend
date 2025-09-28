import { useReadingSessionContext } from "./ReadingSessionContext";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useUserContext } from "../../../../../../../common/auth/UserContext";
import { StickyNoteIcon } from "lucide-react";

export default function SessionNotes() {
  const theme = useTheme();
  const { notes } = useReadingSessionContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  if (notes.length === 0) {
    return null;
  }

  return (
    <Box sx={(theme) => ({ paddingTop: theme.spacing(3) })}>
      <Stack
        spacing={2}
        sx={(theme) => ({ borderTop: `1.5px solid ${theme.palette.divider}` })}
      >
        <Stack
          direction="row"
          alignItems="center"
          spacing={1}
          sx={(theme) => ({ paddingTop: theme.spacing(3) })}
        >
          <Typography variant="h6">
            {isPlLanguage ? "Notatki" : "Notes"}
          </Typography>
          <StickyNoteIcon style={{ color: theme.palette.primary.main }} />
        </Stack>
        <Stack spacing={4}>
          {notes.map((note) => (
            <Stack key={note.id}>
              <Typography variant="h6" color="textPrimary">
                {note.title}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                {note.content}
              </Typography>
            </Stack>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
