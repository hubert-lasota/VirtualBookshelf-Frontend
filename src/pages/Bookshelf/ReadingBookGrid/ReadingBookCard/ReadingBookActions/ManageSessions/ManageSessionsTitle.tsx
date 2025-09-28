import { useUserContext } from "../../../../../../common/auth/UserContext";
import { useReadingBookContext } from "../../ReadingBookContext";
import DialogTitleWithCloseButton from "../../../../../../common/components/Dialog/DliagotTitleWithCloseButton";
import { Divider, Stack, Typography } from "@mui/material";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../common/constants";

type ManageSessionsTitleProps = {
  onClose: () => void;
};

export default function ManageSessionsTitle({
  onClose,
}: ManageSessionsTitleProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const readingBook = useReadingBookContext();

  return (
    <DialogTitleWithCloseButton onClose={onClose}>
      <Stack>
        <Typography fontWeight={600} fontSize="1.3rem">
          {isPlLanguage ? "Sesje czytelnicze" : "Reading Sessions"}
          {TITLE_ENTITY_SEPARATOR}
          {readingBook.book.title}
        </Typography>
        <Typography color="textSecondary">
          {isPlLanguage
            ? "Zarządzaj sesjami czytelniczymi tej książki"
            : "Manage your reading sessions for this book"}
        </Typography>
      </Stack>
      <Divider />
    </DialogTitleWithCloseButton>
  );
}
