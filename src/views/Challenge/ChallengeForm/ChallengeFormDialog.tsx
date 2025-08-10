import {
  ChallengeFormValues,
  createChallengeSchema,
} from "../../../common/models/challengeModels";
import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../../common/config/form";
import { Dialog, DialogContent, Button, DialogActions } from "@mui/material";
import DialogTitleWithCloseButton from "../../../common/components/ui/Dialog/DliagotTitleWithCloseButton";
import { useUserContext } from "../../../common/auth/UserContext";
import CancelButton from "../../../common/components/ui/Button/CancelButton";
import ChallengeFormFields from "./ChallengeFormFields";
import { zodResolver } from "@hookform/resolvers/zod";

type ChallengeFormDialogProps = {
  open: boolean;
  onClose: () => void;
  challengeFormValues?: ChallengeFormValues;
};

export default function ChallengeFormDialog({
  open,
  onClose,
  challengeFormValues,
}: ChallengeFormDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const form = useForm<ChallengeFormValues>({
    mode: FORM_VALIDATE_MODE,
    defaultValues: challengeFormValues,
    resolver: zodResolver(createChallengeSchema(isPlLanguage)),
  });

  const isUpdating = !!challengeFormValues;

  const onSubmit = async () => {};

  return (
    <FormProvider {...form}>
      <Dialog
        open={open}
        onClose={onClose}
        slotProps={{
          paper: {
            component: "form",
            onSubmit: form.handleSubmit(onSubmit),
          },
        }}
      >
        <DialogTitleWithCloseButton onClose={onClose}>
          {isPlLanguage
            ? isUpdating
              ? `Edytuj wyzwanie ${challengeFormValues.title}`
              : "Dodaj nowe wyzwanie"
            : isUpdating
              ? `Edit challenge ${challengeFormValues.title}`
              : "Add new challenge"}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          <ChallengeFormFields />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <Button
            type="submit"
            variant="contained"
            loading={form.formState.isSubmitting}
          >
            {isPlLanguage
              ? isUpdating
                ? "Edytuj"
                : "Dodaj"
              : isUpdating
                ? "Edit"
                : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
