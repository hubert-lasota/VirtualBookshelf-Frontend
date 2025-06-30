import { BookshelfBookNoteResponse } from "../../../common/models/bookshelfBookNoteModels";
import {
  IconButton,
  Paper,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteNoteButton from "./DeleteNoteButton";
import { useUserContext } from "../../../common/auth/UserContext";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import { BookOpen as BookOpenIcon } from "lucide-react";

type NoteCardProps = {
  note: BookshelfBookNoteResponse;
  onEdit: () => void;
};

export default function NoteCard({ note, onEdit }: NoteCardProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const theme = useTheme();

  return (
    <Paper
      sx={(theme) => ({
        borderLeft: `4px solid ${theme.palette.primary.light}`,
        paddingInline: theme.spacing(2),
        paddingBlock: theme.spacing(1.5),
      })}
      component={Stack}
      spacing={1}
    >
      <Stack
        direction="row"
        sx={{ justifyContent: "space-between", alignItems: "center" }}
      >
        <Typography variant="h6">{note.title}</Typography>
        <Stack direction="row">
          <Tooltip title={isPlLanguage ? "Edytuj notatkę" : "Edit note"}>
            <IconButton onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <DeleteNoteButton note={note} />
        </Stack>
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
          >{`Strona ${note.startPage}-${note.endPage}`}</Typography>
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
  );
}
