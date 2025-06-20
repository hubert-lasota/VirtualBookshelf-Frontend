import { useUserContext } from "../../../features/user/UserContext";
import {
  Button,
  CardActions,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState } from "react";
import NoteIcon from "@mui/icons-material/Note";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  BookCheck as BookCheckIcon,
  BookOpenText as BookOpenTextIcon,
  BookUp2 as BookUp2Icon,
} from "lucide-react";
import {
  BookReadingStatus,
  BookshelfBookWithId,
} from "../../../features/bookshelf/bookshelfBookModels";

type BookMenuButtonProps = {
  bookshelfBook: BookshelfBookWithId;
};

export default function BookMenuButton({ bookshelfBook }: BookMenuButtonProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const items = [
    bookshelfBook.status == BookReadingStatus.READING
      ? {
          icon: <BookOpenTextIcon />,
          text: isPlLanguage ? 'Oznacz jako "przeczytane"' : 'Mark as "read"',
        }
      : {
          icon: <BookCheckIcon />,
          text: isPlLanguage
            ? 'Oznacz jako "w trakcie czytania"'
            : 'Mark as "reading"',
        },
    {
      icon: <BookUp2Icon />,
      text: isPlLanguage ? "Przenieś książkę" : "Move book",
    },
    {
      icon: <NoteIcon />,
      text: isPlLanguage ? "Zarządzaj notatkami" : "Manage notes",
    },
    {
      icon: <DeleteIcon />,
      text: isPlLanguage ? "Usuń książkę" : "Delete book",
    },
  ];
  return (
    <CardActions>
      <Button size="small" sx={{ fontSize: "0.85rem", width: "100%" }}>
        {isPlLanguage ? "Zarządzaj" : "Manage"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {items.map(({ icon, text }) => (
          <MenuItem>
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </CardActions>
  );
}
