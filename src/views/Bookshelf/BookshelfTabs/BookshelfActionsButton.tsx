import { useUserContext } from "../../../common/auth/UserContext";
import { BookPlusIcon } from "lucide-react";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import DeleteIcon from "@mui/icons-material/Delete";
import React, { useState } from "react";
import SearchBookDialog from "./SearchBookDialog";
import DeleteBookshelfDialog from "./DeleteBookshelfDialog";
import ReadingBookFormDialog from "./ReadingBookForm/ReadingBookFormDialog";
import MoreActionsButton from "../../../common/components/ui/Button/MoreActionsButton";
import { useBookshelfViewContext } from "../BookshelfViewContext";
import { BookshelfFormMode, isBookshelfResponse } from "../models";

export default function BookshelfActionsButton() {
  const [openCreateBookDialog, setOpenCreateBookDialog] = useState(false);
  const [openSearchBookDialog, setOpenSearchBookDialog] = useState(false);
  const [openDeleteBookshelfDialog, setOpenDeleteBookshelfDialog] =
    useState(false);

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf, onFormModeChange } = useBookshelfViewContext();

  const clickWithStopPropagation = (callback: () => void) => {
    return (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      callback();
    };
  };

  const items = [
    {
      text: isPlLanguage ? "Edytuj regał" : "Edit bookshelf",
      icon: <EditIcon />,
      onClick: clickWithStopPropagation(() =>
        onFormModeChange(BookshelfFormMode.UPDATE),
      ),
    },
    {
      text: isPlLanguage ? "Dodaj książkę" : "Add book",
      icon: <BookPlusIcon />,
      onClick: clickWithStopPropagation(() => setOpenCreateBookDialog(true)),
    },
    {
      text: isPlLanguage ? "Znajdź książkę" : "Search book",
      icon: <SearchIcon />,
      onClick: clickWithStopPropagation(() => setOpenSearchBookDialog(true)),
    },
    {
      text: isPlLanguage ? "Usuń regał" : "Delete bookshelf",
      icon: <DeleteIcon />,
      onClick: clickWithStopPropagation(() =>
        setOpenDeleteBookshelfDialog(true),
      ),
    },
  ];

  return (
    <>
      <MoreActionsButton
        items={items}
        iconButtonProps={{
          size: "small",
          sx: (theme) => ({
            color: theme.palette.primary["100"],
          }),
        }}
      />
      <SearchBookDialog
        open={openSearchBookDialog}
        onClose={() => setOpenSearchBookDialog(false)}
      />
      {isBookshelfResponse(currentBookshelf) && (
        <>
          <DeleteBookshelfDialog
            open={openDeleteBookshelfDialog}
            onClose={() => setOpenDeleteBookshelfDialog(false)}
            bookshelf={currentBookshelf}
          />
          <ReadingBookFormDialog
            open={openCreateBookDialog}
            onClose={() => setOpenCreateBookDialog(false)}
            bookshelf={currentBookshelf}
          />
        </>
      )}
    </>
  );
}
