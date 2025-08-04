import {
  ReadingBookResponse,
  ReadingStatus,
} from "../../../../common/models/readingBookModels";
import { BookCheckIcon, BookOpenTextIcon, BookUp2Icon } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import { useUserContext } from "../../../../common/auth/UserContext";
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
import MoveReadingBookDialog from "./MoveReadingBookDialog";
import DeleteReadingBookDialog from "./DeleteReadingBookDialog";
import { useNavigate } from "react-router-dom";
import { useChangeBookshelfBookStatus } from "../../../../common/api/clients/readingBookClient";
import ManageNotesDialog from "./ManageNotes/ManageNotesDialog";

type BookshelfBookMenuButtonProps = {
  readingBook: ReadingBookResponse;
  onClose: () => void;
};

export default function ReadingBookMenuButton({
  readingBook,
  onClose,
}: BookshelfBookMenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMoveBook, setOpenMoveBook] = useState(false);
  const [openDeleteBook, setOpenDeleteBook] = useState(false);
  const [openManageNotes, setOpenManageNotes] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate: changeStatus } = useChangeBookshelfBookStatus();

  const navigate = useNavigate();

  const items = [
    readingBook.status == ReadingStatus.READING
      ? {
          icon: <BookCheckIcon />,
          text: isPlLanguage ? 'Oznacz jako "przeczytane"' : 'Mark as "read"',
          onClick: () =>
            changeStatus({
              readingBookId: readingBook.id,
              status: ReadingStatus.READ,
            }),
        }
      : {
          icon: <BookOpenTextIcon />,
          text: isPlLanguage
            ? 'Oznacz jako "w trakcie czytania"'
            : 'Mark as "reading"',
          onClick: () =>
            changeStatus({
              readingBookId: readingBook.id,
              status: ReadingStatus.READING,
            }),
        },
    {
      icon: <BookUp2Icon />,
      text: isPlLanguage ? "Przenieś książkę" : "Move book",
      onClick: () => setOpenMoveBook(true),
    },
    {
      icon: <NoteIcon />,
      text: isPlLanguage ? "Zarządzaj notatkami" : "Manage notes",
      onClick: () => setOpenManageNotes(true),
    },
    {
      icon: <DeleteIcon />,
      text: isPlLanguage ? "Usuń książkę" : "Delete book",
      onClick: () => setOpenDeleteBook(true),
      divider: true,
    },
    {
      icon: <BookOpenTextIcon />,
      text: isPlLanguage ? "Przejdź do strony książki" : "See book site",
      onClick: () => navigate(`/books/${readingBook.book.id}`),
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
        onClose={() => {
          setAnchorEl(null);
          onClose();
        }}
      >
        {items.map(({ icon, text, onClick, divider }) => (
          <MenuItem
            color="error"
            key={text}
            onClick={() => {
              setAnchorEl(null);
              onClick();
            }}
            divider={divider}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>

      {openMoveBook && (
        <MoveReadingBookDialog
          readingBook={readingBook}
          open={openMoveBook}
          onClose={() => setOpenMoveBook(false)}
        />
      )}
      <DeleteReadingBookDialog
        open={openDeleteBook}
        onClose={() => setOpenDeleteBook(false)}
        readingBook={readingBook}
      />
      {openManageNotes && (
        <ManageNotesDialog
          open={openManageNotes}
          onClose={() => setOpenManageNotes(false)}
          readingBook={readingBook}
        />
      )}
    </>
  );
}
