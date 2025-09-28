import DialogTitleWithCloseButton from "../../../../../../common/components/Dialog/DliagotTitleWithCloseButton";
import { Divider, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../../../common/auth/UserContext";
import { useReadingBookContext } from "../../ReadingBookContext";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../common/constants";

type ManageNotesTitleProps = {
  onClose: () => void;
};

export default function ManageNotesTitle({ onClose }: ManageNotesTitleProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const readingBook = useReadingBookContext();

  return (
    <DialogTitleWithCloseButton onClose={onClose}>
      <Stack>
        <Typography fontWeight={600} fontSize="1.3rem">
          {isPlLanguage ? "Notatki" : "Notes"}
          {TITLE_ENTITY_SEPARATOR}
          {readingBook.book.title}
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
