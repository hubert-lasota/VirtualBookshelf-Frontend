import { useUserContext } from "../../../../../../common/auth/UserContext";
import { useReadingBookContext } from "../../ReadingBookContext";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../common/constants";
import CommonDialogTitle from "../../../../../../common/components/Dialog/CommonDialogTitle";

export default function ManageNotesTitle() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { book } = useReadingBookContext();
  const titlePrefix = isPlLanguage ? "Notatki" : "Notes";
  return (
    <CommonDialogTitle
      title={`${titlePrefix}${TITLE_ENTITY_SEPARATOR}${book.title}`}
      subtitle={
        isPlLanguage
          ? "Zarządzaj swoimi notatkami i przemyśleniami dotyczącymi tej książki"
          : "Manage your notes and thoughts about this book"
      }
    />
  );
}
