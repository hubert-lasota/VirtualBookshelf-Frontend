import { useUserContext } from "../../../common/auth/UserContext";
import { BookPlusIcon, Pencil, Plus } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import SearchBookDialog from "../BookshelfTabs/SearchBook/SearchBookDialog";
import DeleteBookshelfDialog from "./DeleteBookshelfDialog";
import ReadingBookFormDialog from "./ReadingBookForm/ReadingBookFormDialog";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { isAllBooksBookshelf } from "../shared";
import { getDestructiveMenuItemProps } from "../../../common/utils";
import { ActionItem } from "../../../common/components/Button/types";
import MoreActionsButton from "../../../common/components/Button/MoreActionsButton";
import BookshelfFormDialog from "./BookshelfForm/BookshelfFormDialog";
import { BookshelfResponse } from "../../../common/models/bookshelfModels";

export default function BookshelfActionsButton() {
  const [openDialogs, setOpenDialogs] = useState({
    createBookshelf: false,
    updateBookshelf: false,
    createBook: false,
    searchBook: false,
    deleteBookshelf: false,
  });

  const handleChangeOpenDialog = (
    key: keyof typeof openDialogs,
    open: boolean,
  ) => setOpenDialogs((prev) => ({ ...prev, [key]: open }));

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { currentBookshelf } = useBookshelfPageContext();

  const createBookshelfItem = {
    text: isPlLanguage ? "Dodaj regał" : "Add bookshelf",
    icon: <Plus />,
    onClick: () => handleChangeOpenDialog("createBookshelf", true),
  };

  const items: ActionItem[] = [
    {
      text: isPlLanguage ? "Edytuj regał" : "Edit bookshelf",
      icon: <Pencil />,
      onClick: () => handleChangeOpenDialog("updateBookshelf", true),
    },
    {
      text: isPlLanguage ? "Dodaj książkę" : "Add book",
      icon: <BookPlusIcon />,
      onClick: () => handleChangeOpenDialog("createBook", true),
    },
    {
      text: isPlLanguage ? "Znajdź książkę" : "Search book",
      icon: <SearchIcon />,
      onClick: () => handleChangeOpenDialog("searchBook", true),
      props: {
        divider: true,
      },
    },
    {
      text: isPlLanguage ? "Usuń regał" : "Delete bookshelf",
      icon: <DeleteOutlineIcon />,
      onClick: () => handleChangeOpenDialog("deleteBookshelf", true),
      ...getDestructiveMenuItemProps(),
    },
  ];

  return (
    <>
      <MoreActionsButton
        items={
          isAllBooksBookshelf(currentBookshelf)
            ? [createBookshelfItem]
            : [createBookshelfItem, ...items]
        }
      />
      {openDialogs.createBookshelf && (
        <BookshelfFormDialog
          onClose={() => handleChangeOpenDialog("createBookshelf", false)}
        />
      )}
      {openDialogs.updateBookshelf && (
        <BookshelfFormDialog
          onClose={() => handleChangeOpenDialog("updateBookshelf", false)}
          bookshelf={currentBookshelf as BookshelfResponse}
        />
      )}

      {openDialogs.searchBook && (
        <SearchBookDialog
          onClose={() => handleChangeOpenDialog("searchBook", false)}
        />
      )}
      {openDialogs.deleteBookshelf && (
        <DeleteBookshelfDialog
          onClose={() => handleChangeOpenDialog("deleteBookshelf", false)}
          bookshelf={currentBookshelf as BookshelfResponse}
        />
      )}

      {openDialogs.createBook && (
        <ReadingBookFormDialog
          open={openDialogs.createBook}
          onClose={() => handleChangeOpenDialog("createBook", false)}
          bookshelf={currentBookshelf as BookshelfResponse}
        />
      )}
    </>
  );
}
