import DialogTitleWithCloseButton from "../../../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { Divider, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../../common/auth/UserContext";
import useManageNotesContext from "./ManageNotesContext";

type ManageNotesTitleProps = {
  onClose: () => void;
};

export default function ManageNotesTitle({ onClose }: ManageNotesTitleProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { readingBook } = useManageNotesContext();

  return (
    <DialogTitleWithCloseButton onClose={onClose}>
      <Stack>
        <Typography fontWeight={600} fontSize="1.3rem">
          {isPlLanguage ? "Notatki" : "Notes"}
          {` - ${readingBook.book.title}`}
        </Typography>
        <Typography color="textSecondary">
          {isPlLanguage
            ? "Zarządzaj swoimi notatkami i przemyśleniami dotyczącymi tej książki"
            : "Manage your notes and thoughts about this book"}
        </Typography>
      </Stack>
      <Divider />
    </DialogTitleWithCloseButton>
  );
}
