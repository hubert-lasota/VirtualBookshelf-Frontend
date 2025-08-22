import { FormProvider, useForm } from "react-hook-form";
import { FORM_VALIDATE_MODE } from "../../config/form";
import {
  createReadingSessionSchema,
  ReadingSessionFormValues,
  ReadingSessionResponse,
} from "../../models/readingSessionModels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../auth/UserContext";
import { Dialog, DialogActions, DialogContent } from "@mui/material";
import DialogTitleWithCloseButton from "../ui/Dialog/DliagotTitleWithCloseButton";
import { TITLE_ENTITY_SEPARATOR } from "../../constants";
import CancelButton from "../ui/Button/CancelButton";
import SubmitButton from "../ui/Button/SubmitButton";
import ReadingSessionFormFields from "./ReadingSessionFormFields";
import {
  useCreateReadingSession,
  useUpdateReadingSession,
} from "../../api/clients/readingSessionClient";

type ReadingSessionFormDialogProps = {
  open: boolean;
  onClose: () => void;
  readingSession?: ReadingSessionResponse;
  readingBookId?: number;
};
export default function ReadingSessionFormDialog({
  open,
  onClose,
  readingSession,
  readingBookId,
}: ReadingSessionFormDialogProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const isUpdating = !!readingSession;
  const form = useForm<ReadingSessionFormValues>({
    mode: FORM_VALIDATE_MODE,
    resolver: zodResolver(createReadingSessionSchema(isPlLanguage)),
    defaultValues: isUpdating
      ? {
          ...readingSession,
          description: readingSession.description ?? undefined,
        }
      : undefined,
  });
  if (!isUpdating && !readingBookId) {
    throw new Error(
      "readingBookId is required for creating a new reading session",
    );
  }

  const { mutateAsync: createReadingSession } = useCreateReadingSession();
  const { mutateAsync: updateReadingSession } = useUpdateReadingSession();

  const onSubmit = async (
    readingSessionFormValues: ReadingSessionFormValues,
  ) => {
    console.log("onsubmit");
    if (isUpdating) {
      await updateReadingSession({
        readingSessionId: readingSession!.id,
        readingSessionFormValues,
      });
    } else {
      await createReadingSession({
        readingBookId: readingBookId!,
        readingSessionFormValues,
      });
    }
    onClose();
  };

  const editTitle = isPlLanguage
    ? `Edytujesz sesję${TITLE_ENTITY_SEPARATOR}${readingSession?.book.title}`
    : `Edit session${TITLE_ENTITY_SEPARATOR}${readingSession?.book.title}`;
  const addTitle = isPlLanguage
    ? "Dodaj sesję czytania"
    : "Add reading session";
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
          {isUpdating ? editTitle : addTitle}
        </DialogTitleWithCloseButton>
        <DialogContent dividers>
          <ReadingSessionFormFields />
        </DialogContent>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <SubmitButton isUpdating={isUpdating} />
        </DialogActions>
      </Dialog>
    </FormProvider>
  );
}
