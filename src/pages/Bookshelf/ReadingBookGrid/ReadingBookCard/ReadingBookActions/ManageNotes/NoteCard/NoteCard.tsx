import { ReadingNoteResponse } from "../../../../../../../common/models/readingNoteModels";
import { Paper, Stack, Typography, useTheme } from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { BookOpen as BookOpenIcon } from "lucide-react";
import NoteActionsButton from "./NoteActionsButton";
import { NoteContext } from "./NoteContext";

type NoteCardProps = {
  note: ReadingNoteResponse;
  onEdit: () => void;
};

export default function NoteCard({ note, onEdit }: NoteCardProps) {
  const theme = useTheme();

  return (
    <NoteContext.Provider value={{ note, onEdit }}>
      <Paper
        sx={(theme) => ({
          borderLeft: `4px solid ${theme.palette.primary.light}`,
          paddingInline: theme.spacing(2),
          paddingBlock: theme.spacing(1.5),
          borderRadius: theme.shape.borderRadius,
        })}
        component={Stack}
        spacing={1}
      >
        <Stack
          direction="row"
          sx={{ justifyContent: "space-between", alignItems: "center" }}
        >
          <Typography variant="h6">{note.title}</Typography>
          <NoteActionsButton />
        </Stack>
        <Typography>{note.content}</Typography>
        <Stack direction="row" spacing={3}>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <BookOpenIcon
              style={{
                width: "14px",
                height: "14px",
                color: theme.palette.text.secondary,
              }}
            />
            <Typography
              variant="subtitle2"
              color="textSecondary"
            >{`Strona ${note.pageRange.from}-${note.pageRange.to}`}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <CalendarTodayIcon
              sx={{ fontSize: "14px", color: theme.palette.text.secondary }}
            />
            <Typography variant="subtitle2" color="textSecondary">
              {new Date(note.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
        </Stack>
      </Paper>
    </NoteContext.Provider>
  );
}
