import {
  BookOpenTextIcon,
  BookUp2Icon,
  PanelsTopLeft,
  StickyNote,
} from "lucide-react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useUserContext } from "../../../../../common/auth/UserContext";
import { useState } from "react";
import MoveReadingBookDialog from "./MoveReadingBookDialog";
import DeleteReadingBookDialog from "./DeleteReadingBookDialog";
import { useNavigate } from "react-router-dom";
import ManageNotesDialog from "./ManageNotes/ManageNotesDialog";
import { useReadingBookContext } from "../ReadingBookContext";
import MoreActionsButton, {
  MoreActionsButtonItem,
} from "../../../../../common/components/Button/MoreActionsButton";
import ManageSessionsDialog from "./ManageSessions/ManageSessionsDialog";
import { getDestructiveMenuItemProps } from "../../../../../common/utils";

export default function ReadingBookActionsButton() {
  const [openDialogs, setOpenDialogs] = useState({
    moveBook: false,
    deleteBook: false,
    manageSessions: false,
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

  const navigate = useNavigate();

  const items: MoreActionsButtonItem[] = [
    {
      icon: <BookUp2Icon />,
      text: isPlLanguage ? "Przenieś książkę" : "Move book",
      onClick: () => handleOpenDialogChange("moveBook", true),
    },
    {
      icon: <BookOpenTextIcon />,
      text: isPlLanguage ? "Zarządzaj sesjami" : "Manage sessions",
      onClick: () => handleOpenDialogChange("manageSessions", true),
    },
    {
      icon: <StickyNote />,
      text: isPlLanguage ? "Zarządzaj notatkami" : "Manage notes",
      onClick: () => handleOpenDialogChange("manageNotes", true),
    },
    {
      icon: <PanelsTopLeft />,
      text: isPlLanguage ? "Przejdź do strony książki" : "See book site",
      onClick: () => navigate(`/books/${readingBook.book.id}`),
      props: {
        divider: true,
      },
    },
    {
      icon: <DeleteOutlineIcon />,
      text: isPlLanguage ? "Usuń książkę" : "Delete book",
      onClick: () => handleOpenDialogChange("deleteBook", true),
      ...getDestructiveMenuItemProps(),
    },
  ];
  return (
    <>
      <MoreActionsButton items={items} iconButtonProps={{ size: "small" }} />

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
          onClose={() => handleOpenDialogChange("manageNotes", false)}
        />
      )}
      {openDialogs.manageSessions && (
        <ManageSessionsDialog
          onClose={() => handleOpenDialogChange("manageSessions", false)}
        />
      )}
    </>
  );
}
