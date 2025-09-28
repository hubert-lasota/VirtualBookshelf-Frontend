import {
  ChallengeFormValues,
  ChallengeResponse,
  createChallengeSchema,
} from "../../../common/models/challengeModels";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import DialogTitleWithCloseButton from "../../../common/components/Dialog/DliagotTitleWithCloseButton";
import { useUserContext } from "../../../common/auth/UserContext";
import CancelButton from "../../../common/components/Button/CancelButton";
import ChallengeFormFields from "./ChallengeFormFields";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateChallenge,
  useUpdateChallenge,
} from "../../../common/api/clients/challengeClient";
import SubmitButton from "../../../common/components/Button/SubmitButton";
import { TITLE_ENTITY_SEPARATOR } from "../../../common/constants";

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

  const form = useForm<ChallengeFormValues>({
    mode: FORM_VALIDATE_MODE,
    defaultValues: challengeFormValues,
    resolver: zodResolver(createChallengeSchema(isPlLanguage)),
  });

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

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: { minWidth: "60%" },
            component: "form",
            onSubmit: form.handleSubmit(onSubmit),
          },
        }}
      >
        <DialogTitleWithCloseButton onClose={onClose}>
          {isPlLanguage
            ? isUpdating
              ? `Edytuj wyzwanie${TITLE_ENTITY_SEPARATOR}${challenge.title}`
              : "Dodaj nowe wyzwanie"
            : isUpdating
              ? `Edit challenge${TITLE_ENTITY_SEPARATOR}${challenge.title}`
              : "Add new challenge"}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          <ChallengeFormFields />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <SubmitButton isUpdating={isUpdating} />
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
