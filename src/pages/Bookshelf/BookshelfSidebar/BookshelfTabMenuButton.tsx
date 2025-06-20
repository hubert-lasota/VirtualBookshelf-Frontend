import {
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useUserContext } from "../../../features/user/UserContext";
import { BookPlusIcon } from "lucide-react";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { useState } from "react";
import BookshelfFormDialog from "../BookshelfForm/BookshelfFormDialog";
import SearchBookDialog from "../SearchBookDialog";
import DeleteBookshelfDialog from "../DeleteBookshelfDialog";
import BookFormDialog from "../BookFormDialog";

export default function BookshelfTabMenuButton() {
  const [openUpdateBookshelfDialog, setOpenUpdateBookshelfDialog] =
    useState(false);
  const [openCreateBookDialog, setOpenCreateBookDialog] = useState(false);
  const [openSearchBookDialog, setOpenSearchBookDialog] = useState(false);
  const [openDeleteBookshelfDialog, setOpenDeleteBookshelfDialog] =
    useState(false);

  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { bookshelves, currentBookshelfIndex } = useBookshelfPageContext();
  const currentBookshelf = bookshelves[currentBookshelfIndex];
  const actions = [
    {
      name: isPlLanguage ? "Edytuj regał" : "Edit bookshelf",
      icon: <EditIcon />,
      onClick: () => setOpenUpdateBookshelfDialog(true),
    },
    {
      name: isPlLanguage ? "Dodaj książkę" : "Add book",
      icon: <BookPlusIcon />,
      onClick: () => setOpenCreateBookDialog(true),
    },
    {
      name: isPlLanguage ? "Znajdź książkę" : "Search book",
      icon: <SearchIcon />,
      onClick: () => setOpenSearchBookDialog(true),
    },
    {
      name: isPlLanguage ? "Usuń regał" : "Delete bookshelf",
      icon: <DeleteIcon />,
      onClick: () => setOpenDeleteBookshelfDialog(true),
    },
  ];

  return (
    <>
      <Tooltip title={isPlLanguage ? "Więcej akcji" : "More actions"}>
        <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
          <MoreHorizIcon />
        </IconButton>
      </Tooltip>
      <Menu
        open={!!anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
      >
        {actions.map(({ name, icon, onClick }) => (
          <MenuItem
            onClick={() => {
              onClick();
              setAnchorEl(null);
            }}
          >
            <ListItemIcon>{icon}</ListItemIcon>
            <ListItemText>{name}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
      <BookshelfFormDialog
        open={openUpdateBookshelfDialog}
        onClose={() => setOpenUpdateBookshelfDialog(false)}
        bookshelf={openUpdateBookshelfDialog ? currentBookshelf : undefined}
      />
      <SearchBookDialog
        open={openSearchBookDialog}
        onClose={() => setOpenSearchBookDialog(false)}
      />
      {currentBookshelf && (
        <>
          <DeleteBookshelfDialog
            open={openDeleteBookshelfDialog}
            onClose={() => setOpenDeleteBookshelfDialog(false)}
            bookshelf={currentBookshelf}
          />
          <BookFormDialog
            bookshelf={currentBookshelf}
            open={openCreateBookDialog}
            onClose={() => setOpenCreateBookDialog(false)}
          />
        </>
      )}
    </>
  );
}
