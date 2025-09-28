import { useUserContext } from "../../../../../../common/auth/UserContext";
import { useReadingBookContext } from "../../ReadingBookContext";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../common/constants";
import CommonDialogTitle from "../../../../../../common/components/Dialog/CommonDialogTitle";

type ManageSessionsTitleProps = {
  onClose: () => void;
};

export default function ManageSessionsTitle({
  onClose,
}: ManageSessionsTitleProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { book } = useReadingBookContext();

  const titlePrefix = isPlLanguage ? "Sesje czytelnicze" : "Reading Sessions";
  return (
    <CommonDialogTitle
      onClose={onClose}
      title={`${titlePrefix}${TITLE_ENTITY_SEPARATOR}${book.title}`}
      subtitle={
        isPlLanguage
          ? "Zarządzaj sesjami czytelniczymi tej książki"
          : "Manage your reading sessions for this book"
      }
    />
  );
}
