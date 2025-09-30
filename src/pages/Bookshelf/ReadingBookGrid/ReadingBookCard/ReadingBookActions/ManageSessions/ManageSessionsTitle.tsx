import { useUserContext } from "../../../../../../common/auth/UserContext";
import { useReadingBookContext } from "../../ReadingBookContext";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../common/constants";
import CommonDialogTitle from "../../../../../../common/components/Dialog/CommonDialogTitle";

export default function ManageSessionsTitle() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { book } = useReadingBookContext();

  const titlePrefix = isPlLanguage ? "Sesje czytelnicze" : "Reading Sessions";
  return (
    <CommonDialogTitle
      title={`${titlePrefix}${TITLE_ENTITY_SEPARATOR}${book.title}`}
      subtitle={
        isPlLanguage
          ? "Zarządzaj sesjami czytelniczymi tej książki"
          : "Manage your reading sessions for this book"
      }
    />
  );
}
