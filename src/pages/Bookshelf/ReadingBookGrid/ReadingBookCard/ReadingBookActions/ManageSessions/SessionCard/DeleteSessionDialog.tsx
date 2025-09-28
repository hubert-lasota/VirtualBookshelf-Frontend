import DeleteEntityDialog from "../../../../../../../common/components/Dialog/DeleteEntityDialog";
import { useUserContext } from "../../../../../../../common/auth/UserContext";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../../common/constants";
import { useReadingSessionContext } from "./ReadingSessionContext";

type DeleteSessionDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function DeleteSessionDialog({
  open,
  onClose,
}: DeleteSessionDialogProps) {
  const { title } = useReadingSessionContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() => {}}
      title={isPlLanguage ? "Usuń sesję" : "Delete session"}
      contentText={
        isPlLanguage
          ? `Czy na pewno chcesz usunąć sesję${TITLE_ENTITY_SEPARATOR}${title}?`
          : `Are you sure you want to delete session${TITLE_ENTITY_SEPARATOR}${title}?`
      }
    />
  );
}
