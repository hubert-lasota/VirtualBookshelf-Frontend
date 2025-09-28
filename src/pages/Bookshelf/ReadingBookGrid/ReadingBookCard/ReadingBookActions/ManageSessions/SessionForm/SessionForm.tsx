import { useUserContext } from "../../../../../../../common/auth/UserContext";
import ControlledNumberField from "../../../../../../../common/components/FormInput/ControlledNumberField";
import RequiredLabel from "../../../../../../../common/components/Label/RequiredLabel";
import ControlledDateTimePicker from "../../../../../../../common/components/FormInput/ControlledDateTimePicker";
import ControlledTextField from "../../../../../../../common/components/FormInput/ControlledTextField";
import { DialogContent, Grid, Stack, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import {
  createReadingSessionSchema,
  ReadingSessionFormValues,
  ReadingSessionResponse,
} from "../../../../../../../common/models/readingSessionModels";
import { FORM_VALIDATE_MODE } from "../../../../../../../common/config/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateReadingSession,
  useUpdateReadingSession,
} from "../../../../../../../common/api/clients/readingSessionClient";
import { useReadingBookContext } from "../../../ReadingBookContext";
import SessionFormNoteFields from "./SessionFormNoteFields";
import CommonDialogActions from "../../../../../../../common/components/Dialog/CommonDialogActions";

type SessionFormProps = {
  session?: ReadingSessionResponse;
  onCloseForm: () => void;
};

export default function SessionForm({
  session,
  onCloseForm,
}: SessionFormProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { id: readingBookId } = useReadingBookContext();
  const isUpdating = !!session;

  const form = useForm<ReadingSessionFormValues>({
    mode: FORM_VALIDATE_MODE,
    resolver: zodResolver(createReadingSessionSchema(isPlLanguage)),
    defaultValues: isUpdating ? session : undefined,
  });

  const { mutateAsync: createReadingSession } = useCreateReadingSession();
  const { mutateAsync: updateReadingSession } = useUpdateReadingSession();

  const onSubmit = async (
    readingSessionFormValues: ReadingSessionFormValues,
  ) => {
    if (isUpdating) {
      await updateReadingSession({
        readingSessionId: session!.id,
        readingSessionFormValues,
      });
    } else {
      await createReadingSession({
        readingBookId,
        readingSessionFormValues,
      });
    }
    onCloseForm();
  };

  const fields = [
    {
      component: ControlledTextField,
      props: {
        name: "title",
        label: <RequiredLabel text={isPlLanguage ? "Tytuł" : "Title"} />,
      },
      size: 12,
    },
    {
      component: ControlledNumberField,
      props: {
        name: "pageRange.from",
        label: (
          <RequiredLabel text={isPlLanguage ? "Strona od" : "Start page"} />
        ),
      },
    },
    {
      component: ControlledNumberField,
      props: {
        name: "pageRange.to",
        label: <RequiredLabel text={isPlLanguage ? "Strona do" : "End page"} />,
      },
    },
    {
      component: ControlledDateTimePicker,
      props: {
        name: "durationRange.startedAt",
        label: (
          <RequiredLabel
            text={
              isPlLanguage ? "Data i czas rozpoczęcia" : "Start date and time"
            }
          />
        ),
      },
    },
    {
      component: ControlledDateTimePicker,
      props: {
        name: "durationRange.finishedAt",
        label: (
          <RequiredLabel
            text={
              isPlLanguage ? "Data i czas zakończenia" : "End date and time"
            }
          />
        ),
      },
    },
  ];
  return (
    <FormProvider {...form}>
      <Stack
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        spacing={3}
      >
        <DialogContent
          sx={(theme) => ({
            display: "flex",
            flexDirection: "column",
            gap: theme.spacing(2),
          })}
        >
          <Typography variant="h6">
            {isUpdating
              ? isPlLanguage
                ? "Edytujesz sesję"
                : "Edit session"
              : isPlLanguage
                ? "Dodaj nową sesję"
                : "Add new session"}
          </Typography>
          <Grid container spacing={3}>
            {fields.map(({ size = 6, props, component: FieldComponent }) => (
              <Grid size={size}>
                <FieldComponent {...props} />
              </Grid>
            ))}
          </Grid>
          <SessionFormNoteFields />
        </DialogContent>
        <CommonDialogActions onClickCancel={onCloseForm} />
      </Stack>
    </FormProvider>
  );
}
