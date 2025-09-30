import { useUserContext } from "../../../common/auth/UserContext";
import { BookPlusIcon, Pencil } from "lucide-react";
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useState } from "react";
import SearchBookDialog from "./SearchBook/SearchBookDialog";
import DeleteBookshelfDialog from "./DeleteBookshelfDialog";
import ReadingBookFormDialog from "./ReadingBookForm/ReadingBookFormDialog";
import MoreActionsButton, {
  MoreActionsButtonItem,
} from "../../../common/components/Button/MoreActionsButton";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import { BookshelfFormMode, isBookshelfResponse } from "../shared";
import { getDestructiveMenuItemProps } from "../../../common/utils";

export default function BookshelfActionsButton() {
  const [openDialogs, setOpenDialogs] = useState({
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

  const { currentBookshelf, onFormModeChange } = useBookshelfPageContext();

  const items: MoreActionsButtonItem[] = [
    {
      text: isPlLanguage ? "Edytuj regał" : "Edit bookshelf",
      icon: <Pencil />,
      onClick: () => onFormModeChange(BookshelfFormMode.UPDATE),
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
      <MoreActionsButton items={items} iconButtonProps={{ size: "small" }} />
      {openDialogs.searchBook && (
        <SearchBookDialog
          onClose={() => handleChangeOpenDialog("searchBook", false)}
        />
      )}
      {isBookshelfResponse(currentBookshelf) && (
        <>
          <DeleteBookshelfDialog
            open={openDialogs.deleteBookshelf}
            onClose={() => handleChangeOpenDialog("deleteBookshelf", false)}
            bookshelf={currentBookshelf}
          />
          <ReadingBookFormDialog
            open={openDialogs.createBook}
            onClose={() => handleChangeOpenDialog("createBook", false)}
            bookshelf={currentBookshelf}
          />
        </>
      )}
    </>
  );
}
