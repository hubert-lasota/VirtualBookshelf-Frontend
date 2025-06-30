import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { BookOpenText as BookOpenTextIcon } from "lucide-react";
import { Divider, Stack, useTheme } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import useManageNotesContext from "./ManageNotesContext";

type ManageNotesTitleProps = {
  onClose: () => void;
};

export default function ManageNotesTitle({ onClose }: ManageNotesTitleProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const theme = useTheme();

  const { bookshelfBook } = useManageNotesContext();

  return (
    <DialogTitleWithCloseButton onClose={onClose}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <BookOpenTextIcon style={{ color: theme.palette.primary.main }} />
        <span>
          {isPlLanguage ? "Notatki" : "Notes"}
          {` - ${bookshelfBook.book.title}`}
        </span>
      </Stack>
      <Divider />
    </DialogTitleWithCloseButton>
  );
}
