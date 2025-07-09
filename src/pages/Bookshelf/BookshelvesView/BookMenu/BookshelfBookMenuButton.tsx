import {
  BookReadingStatus,
  BookshelfBookResponse,
} from "../../../../common/models/bookshelfBookModels";
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
import MoveBookDialog from "./MoveBookDialog";
import RemoveBookDialog from "./RemoveBookDialog";
import { useNavigate } from "react-router-dom";
import { useChangeBookshelfBookStatus } from "../../../../common/api/clients/bookshelfBookClient";
import ManageNotesDialog from "../../ManageNotes/ManageNotesDialog";

type BookshelfBookMenuButtonProps = {
  bookshelfBook: BookshelfBookResponse;
  onClose: () => void;
};

export default function BookshelfBookMenuButton({
  bookshelfBook,
  onClose,
}: BookshelfBookMenuButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openMoveBook, setOpenMoveBook] = useState(false);
  const [openRemoveBook, setOpenRemoveBook] = useState(false);
  const [openManageNotes, setOpenManageNotes] = useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { mutate: changeStatus } = useChangeBookshelfBookStatus();

  const navigate = useNavigate();

  const items = [
    bookshelfBook.status == BookReadingStatus.READING
      ? {
          icon: <BookCheckIcon />,
          text: isPlLanguage ? 'Oznacz jako "przeczytane"' : 'Mark as "read"',
          onClick: () =>
            changeStatus({
              bookshelfBookId: bookshelfBook.id,
              status: BookReadingStatus.READ,
            }),
        }
      : {
          icon: <BookOpenTextIcon />,
          text: isPlLanguage
            ? 'Oznacz jako "w trakcie czytania"'
            : 'Mark as "reading"',
          onClick: () =>
            changeStatus({
              bookshelfBookId: bookshelfBook.id,
              status: BookReadingStatus.READING,
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
      onClick: () => setOpenRemoveBook(true),
      divider: true,
    },
    {
      icon: <BookOpenTextIcon />,
      text: isPlLanguage ? "Przejdź do strony książki" : "See book site",
      onClick: () => navigate(`/books/${bookshelfBook.book.id}`),
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
      {openManageNotes && (
        <ManageNotesDialog
          open={openManageNotes}
          onClose={() => setOpenManageNotes(false)}
          bookshelfBook={bookshelfBook}
        />
      )}
    </>
  );
}
