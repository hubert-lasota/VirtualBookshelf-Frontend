import { useBookshelfPageContext } from "../BookshelfPageContext";
import { Button, Divider, Stack } from "@mui/material";
import ConfigTab from "./ConfigTab";
import { useUserContext } from "../../../features/user/UserContext";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Action,
  useManageBookshelvesContext,
} from "./ManageBookshelvesContext";

export default function LeftColumn() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { bookshelves } = useBookshelfPageContext();
  const { setAction, setSelectedBookshelf } = useManageBookshelvesContext();

  return (
    <Stack spacing={2} flexGrow={1}>
      {bookshelves.map((bookshelf) => (
        <ConfigTab
          name={bookshelf.name}
          onClick={() => {
            setAction(Action.MUTATE_BOOKSHELF);
            setSelectedBookshelf(bookshelf);
          }}
        />
      ))}
      {bookshelves.length > 0 && <Divider />}
      <Button
        variant="contained"
        startIcon={<AddBoxIcon />}
        sx={{ p: 0.5, fontSize: "0.9rem" }}
        onClick={() => {
          setAction(Action.MUTATE_BOOKSHELF);
          setSelectedBookshelf(null);
        }}
      >
        {isPlLanguage ? "Nowy regał" : "New Bookshelf"}
      </Button>
    </Stack>
  );
}
