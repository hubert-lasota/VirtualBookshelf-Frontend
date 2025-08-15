import { ReadingStatus } from "../../../../../common/models/readingBookModels";
import {
  BookCheckIcon,
  BookOpenTextIcon,
  BookUp2Icon,
  StickyNote,
} from "lucide-react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useUserContext } from "../../../../../common/auth/UserContext";
import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useState } from "react";
import MoveReadingBookDialog from "./MoveReadingBookDialog";
import DeleteReadingBookDialog from "./DeleteReadingBookDialog";
import { useNavigate } from "react-router-dom";
import { useChangeBookshelfBookStatus } from "../../../../../common/api/clients/readingBookClient";
import ManageNotesDialog from "./ManageNotes/ManageNotesDialog";
import { useReadingBookContext } from "../ReadingBookContext";

type ReadingBookActionsButtonProps = {
  onClose: () => void;
};

export default function ReadingBookActionsButton({
  onClose,
}: ReadingBookActionsButtonProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [openDialogs, setOpenDialogs] = useState({
    moveBook: false,
    deleteBook: false,
    manageNotes: false,
  });

  const handleOpenDialogChange = (
    key: keyof typeof openDialogs,
    open: boolean,
  ) => setOpenDialogs((prev) => ({ ...prev, [key]: open }));

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const readingBook = useReadingBookContext();

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
      onClick: () => handleOpenDialogChange("moveBook", true),
    },
    {
      icon: <StickyNote />,
      text: isPlLanguage ? "Zarządzaj notatkami" : "Manage notes",
      onClick: () => handleOpenDialogChange("manageNotes", true),
    },
    {
      icon: <DeleteOutlineIcon />,
      text: isPlLanguage ? "Usuń książkę" : "Delete book",
      onClick: () => handleOpenDialogChange("deleteBook", true),
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

      {openDialogs.moveBook && (
        <MoveReadingBookDialog
          readingBook={readingBook}
          open={openDialogs.moveBook}
          onClose={() => handleOpenDialogChange("moveBook", false)}
        />
      )}
      <DeleteReadingBookDialog
        open={openDialogs.deleteBook}
        onClose={() => handleOpenDialogChange("deleteBook", false)}
        readingBook={readingBook}
      />
      {openDialogs.manageNotes && (
        <ManageNotesDialog
          open={openDialogs.manageNotes}
          onClose={() => handleOpenDialogChange("manageNotes", false)}
          readingBook={readingBook}
        />
      )}
    </>
  );
}
