import { BookReadingStatus } from "../../../common/models/bookshelfBookModels";
import { BookCheckIcon, BookOpenTextIcon, BookUp2Icon } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserContext } from "../../../common/auth/UserContext";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import NoteIcon from "@mui/icons-material/Note";
import { useState } from "react";
import MoveBookDialog from "./MoveBookDialog";
import RemoveBookDialog from "./RemoveBookDialog";
import { BookshelfBookResponse } from "../../../common/models/bookshelfModels";

type BookMenuButtonProps = {
  bookshelfBook: BookshelfBookResponse;
};

export default function BookMenuButton({ bookshelfBook }: BookMenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMoveBook, setOpenMoveBook] = useState(false);
  const [openRemoveBook, setOpenRemoveBook] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

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
      onClick: () => setOpenMoveBook(true),
    },
    {
      icon: <NoteIcon />,
      text: isPlLanguage ? "Zarządzaj notatkami" : "Manage notes",
    },
    {
      icon: <DeleteIcon />,
      text: isPlLanguage ? "Usuń książkę" : "Delete book",
      onClick: () => setOpenRemoveBook(true),
    },
  ];

  return (
    <>
      <IconButton
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={(theme) => ({
          width: "30px",
          height: "30px",
          transition: "all 0.3s ease",
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: theme.palette.background.paper,
            opacity: "90%",
          },
        })}
      >
        <MoreHorizIcon />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
      >
        {items.map(({ icon, text, onClick }) => (
          <MenuItem
            key={text}
            onClick={() => {
              setAnchorEl(null);
              // @ts-ignore
              onClick();
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {openMoveBook && (
        <MoveBookDialog
          bookshelfBook={bookshelfBook}
          open={openMoveBook}
          onClose={() => setOpenMoveBook(false)}
        />
      )}
      <RemoveBookDialog
        open={openRemoveBook}
        onClose={() => setOpenRemoveBook(false)}
        bookshelfBook={bookshelfBook}
      />
    </>
  );
}
