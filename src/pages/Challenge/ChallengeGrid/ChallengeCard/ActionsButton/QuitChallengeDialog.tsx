import DeleteEntityDialog from "../../../../../common/components/ui/Dialog/DeleteEntityDialog";
import { useUserContext } from "../../../../../common/auth/UserContext";
import { useChallengeContext } from "../ChallengeContext";
import { useQuitChallenge } from "../../../../../common/api/clients/challengeClient";

type QuitChallengeDialogProps = {
  open: boolean;
  onClose: () => void;
};

export default function QuitChallengeDialog({
  open,
  onClose,
}: QuitChallengeDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { title, id } = useChallengeContext();

  const { mutate, isPending } = useQuitChallenge();

  return (
    <DeleteEntityDialog
      open={open}
      onClose={onClose}
      onDelete={() => mutate(id)}
      title={isPlLanguage ? "Zrezygnuj z wyzwania" : "Quit challenge"}
      contentText={
        isPlLanguage
          ? `Czy na pewno chcesz zrezygnować z wyzwania ${title}?`
          : `Are you sure you want to quit challenge ${title}?`
      }
      deleteButtonProps={{
        startIcon: null,
        children: isPlLanguage ? "Zrezygnuj" : "Quit",
        loading: isPending,
      }}
    />
  );
}
