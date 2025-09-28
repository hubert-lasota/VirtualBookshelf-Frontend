import { useUserContext } from "../../../../../../common/auth/UserContext";
import ControlledNumberField from "../../../../../../common/components/FormInput/ControlledNumberField";
import RequiredLabel from "../../../../../../common/components/Label/RequiredLabel";
import ControlledDateTimePicker from "../../../../../../common/components/FormInput/ControlledDateTimePicker";
import ControlledTextField from "../../../../../../common/components/FormInput/ControlledTextField";
import OptionalLabel from "../../../../../../common/components/Label/OptionalLabel";
import { Grid, Stack, Typography } from "@mui/material";
import SubmitButton from "../../../../../../common/components/Button/SubmitButton";
import CancelButton from "../../../../../../common/components/Button/CancelButton";
import { FormProvider, useForm } from "react-hook-form";
import {
  createReadingSessionSchema,
  ReadingSessionFormValues,
  ReadingSessionResponse,
} from "../../../../../../common/models/readingSessionModels";
import { FORM_VALIDATE_MODE } from "../../../../../../common/config/form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useCreateReadingSession,
  useUpdateReadingSession,
} from "../../../../../../common/api/clients/readingSessionClient";
import { useReadingBookContext } from "../../ReadingBookContext";

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
    {
      component: ControlledTextField,
      props: {
        name: "Opis",
        label: <OptionalLabel text={isPlLanguage ? "Opis" : "Description"} />,
        multiline: true,
      },
      size: 12,
    },
  ];
  return (
    <FormProvider {...form}>
      <Stack
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        spacing={3}
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
        <Stack
          spacing={1}
          direction="row"
          justifyContent="flex-end"
          sx={{ width: "100%" }}
        >
          <CancelButton onClick={onCloseForm} />
          <SubmitButton />
        </Stack>
      </Stack>
    </FormProvider>
  );
}
