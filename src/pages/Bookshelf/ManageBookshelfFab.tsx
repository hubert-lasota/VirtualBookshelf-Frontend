import { SpeedDial, SpeedDialAction } from "@mui/material";
import { useState } from "react";
import { useUserContext } from "../../features/user/UserContext";
import { useBookshelfPageContext } from "./BookshelfPageContext";
import { SHOW_ALL_BOOKS_INDEX } from "./BookshelfPage";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { BookCheck, BookPlus } from "lucide-react";
import DeleteIcon from "@mui/icons-material/Delete";
import BookshelfFormDialog from "./BookshelfForm/BookshelfFormDialog";
import SettingsIcon from "@mui/icons-material/Settings";

export default function ManageBookshelfFab() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { currentBookshelfIndex, bookshelves } = useBookshelfPageContext();
  const [openFab, setOpenFab] = useState(false);
  const [openCreateBookshelfDialog, setOpenCreateBookshelfDialog] =
    useState(false);
  const [openUpdateBookshelfDialog, setOpenUpdateBookshelfDialog] =
    useState(false);
  const [openCreateBookDialog, setOpenCreateBookDialog] = useState(false);
  const [openSearchBookDialog, setOpenSearchBookDialog] = useState(false);
  const [openDeleteBookDialog, setOpenDeleteBookDialog] = useState(false);

  const actions = [
    {
      name: isPlLanguage ? "Dodaj nowy regał" : "Add new bookshelf",
      icon: <AddIcon />,
      onClick: () => setOpenCreateBookshelfDialog(true),
    },
  ];

  if (currentBookshelfIndex !== SHOW_ALL_BOOKS_INDEX) {
    const updateBookshelfAction = {
      name: isPlLanguage ? "Edytuj regał" : "Edit bookshelf",
      icon: <EditIcon />,
      onClick: () => setOpenUpdateBookshelfDialog(true),
    };
    const createBookAction = {
      name: isPlLanguage ? "Dodaj książkę" : "Add book",
      icon: <BookPlus />,
      onClick: () => setOpenCreateBookDialog(true),
    };
    const searchBookAction = {
      name: isPlLanguage ? "Znajdź książkę" : "Search book",
      icon: <BookCheck />,
      onClick: () => setOpenSearchBookDialog(true),
    };
    const deleteBookshelfAction = {
      name: isPlLanguage ? "Usuń regał" : "Delete bookshelf",
      icon: <DeleteIcon />,
      onClick: () => setOpenDeleteBookDialog(true),
    };
    actions.push(
      updateBookshelfAction,
      createBookAction,
      searchBookAction,
      deleteBookshelfAction,
    );
  }

  return (
    <>
      <SpeedDial
        ariaLabel={isPlLanguage ? "Zarządzaj regałami" : "Manage bookshelves"}
        sx={{ position: "absolute", bottom: "2.5rem", right: "2rem" }}
        icon={<SettingsIcon />}
        onClose={() => setOpenFab(false)}
        onOpen={() => setOpenFab(true)}
        open={openFab}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            sx={{
              "& .MuiSpeedDialAction-staticTooltipLabel": {
                width: "max-content",
              },
            }}
            slotProps={{
              tooltip: {
                title: action.name,
                open: true,
              },
            }}
            onClick={() => action.onClick()}
          />
        ))}
      </SpeedDial>
      <BookshelfFormDialog
        open={openCreateBookshelfDialog || openUpdateBookshelfDialog}
        onClose={() => {
          setOpenCreateBookshelfDialog(false);
          setOpenUpdateBookshelfDialog(false);
        }}
        bookshelf={
          openUpdateBookshelfDialog
            ? bookshelves[currentBookshelfIndex] || null
            : null
        }
      />
    </>
  );
}
