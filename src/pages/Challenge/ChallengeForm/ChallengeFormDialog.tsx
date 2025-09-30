import {
  ChallengeFormValues,
  ChallengeResponse,
  createChallengeSchema,
} from "../../../common/models/challengeModels";
import { DialogContent } from "@mui/material";
import { useUserContext } from "../../../common/auth/UserContext";
import ChallengeFormFields from "./ChallengeFormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateChallenge,
  useUpdateChallenge,
} from "../../../common/api/clients/challengeClient";
import { TITLE_ENTITY_SEPARATOR } from "../../../common/constants";
import FormDialog from "../../../common/components/Form/FormDialog";

type ChallengeFormDialogProps = {
  open: boolean;
  onClose: () => void;
  challenge?: ChallengeResponse;
};

export default function ChallengeFormDialog({
  open,
  onClose,
  challenge,
}: ChallengeFormDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const challengeFormValues: ChallengeFormValues | undefined = challenge
    ? {
        ...challenge,
        genreId: challenge.genre?.id,
      }
    : undefined;

  const isUpdating = !!challenge;

  const { mutateAsync: createChallenge } = useCreateChallenge();
  const { mutateAsync: updateChallenge } = useUpdateChallenge();

  const onSubmit = async (challengeFormValues: ChallengeFormValues) => {
    if (isUpdating) {
      await updateChallenge({
        challengeId: challenge.id,
        challenge: challengeFormValues,
      });
    } else {
      await createChallenge(challengeFormValues);
    }
    onClose();
  };

  const updateTitle =
    (isPlLanguage ? "Edytuj wyzwanie" : "Edit challenge") +
    TITLE_ENTITY_SEPARATOR +
    challenge?.title;
  const addTitle = isPlLanguage ? "Dodaj nowe wyzwanie" : "Add new challenge";

  return (
    <FormDialog<ChallengeFormValues>
      open={open}
      onClose={onClose}
      onSubmit={onSubmit}
      resolver={zodResolver(createChallengeSchema(isPlLanguage))}
      title={isUpdating ? updateTitle : addTitle}
      paper={{ sx: { minWidth: "60%" } }}
      defaultValues={challengeFormValues}
    >
      <DialogContent dividers>
        <ChallengeFormFields />
      </DialogContent>
    </FormDialog>
  );
}
