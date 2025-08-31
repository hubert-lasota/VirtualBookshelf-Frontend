import { DialogActions, Grid, Stack, Typography } from "@mui/material";
import CancelButton from "../../../../../../common/components/ui/Button/CancelButton";
import { useUserContext } from "../../../../../../common/auth/UserContext";
import RequiredLabel from "../../../../../../common/components/ui/Label/RequiredLabel";
import ControlledNumberField from "../../../../../../common/components/FormInput/ControlledNumberField";
import ControlledTextField from "../../../../../../common/components/FormInput/ControlledTextField";
import { FormProvider, useForm } from "react-hook-form";
import {
  ReadingNoteFormValues,
  ReadingNoteResponse,
} from "../../../../../../common/models/readingNoteModels";
import { FORM_VALIDATE_MODE } from "../../../../../../common/config/form";
import {
  useCreateReadingNote,
  useUpdateReadingNote,
} from "../../../../../../common/api/clients/readingNoteClient";
import { useReadingBookContext } from "../../ReadingBookContext";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../common/constants";
import SubmitButton from "../../../../../../common/components/ui/Button/SubmitButton";

type NoteFormProps = {
  note?: ReadingNoteFormValues;
  noteId?: ReadingNoteResponse["id"];
  onClose: () => void;
};

export default function NoteForm({ note, noteId, onClose }: NoteFormProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const readingBook = useReadingBookContext();

  const form = useForm<ReadingNoteFormValues>({
    mode: FORM_VALIDATE_MODE,
    defaultValues: note,
  });

  const { mutate: createNote } = useCreateReadingNote();
  const { mutate: updateNote } = useUpdateReadingNote();

  const isUpdating = !!note && !!noteId;

  const onSubmit = (note: ReadingNoteFormValues) => {
    const readingBookId = readingBook.id;
    if (isUpdating) {
      updateNote({ note, noteId, readingBookId });
    } else {
      createNote({ note, readingBookId });
    }

    onClose();
  };

  const fields = [
    {
      props: {
        name: "title",
        label: (
          <RequiredLabel text={isPlLanguage ? "Tytuł notatki" : "Note title"} />
        ),
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
      props: {
        name: "content",
        label: (
          <RequiredLabel
            text={isPlLanguage ? "Treść notatki" : "Note content"}
          />
        ),
        multiline: true,
      },
      size: 12,
    },
  ];

  return (
    <FormProvider {...form}>
      <Stack
        spacing={2}
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <Typography variant="h6">
          {isUpdating
            ? isPlLanguage
              ? `Edytujesz notatkę${TITLE_ENTITY_SEPARATOR}${note?.title}`
              : `You are editing${TITLE_ENTITY_SEPARATOR}${note?.title}`
            : isPlLanguage
              ? "Dodaj nową notatkę"
              : "Add new note"}
        </Typography>
        <Grid container spacing={2}>
          {fields.map(({ component, props, size }) => {
            const Field = component || ControlledTextField;
            return (
              <Grid size={size ?? 6}>
                <Field {...props} />{" "}
              </Grid>
            );
          })}
        </Grid>
        <DialogActions>
          <CancelButton onClick={onClose} />
          <SubmitButton isUpdating={isUpdating} />
        </DialogActions>
      </Stack>
    </FormProvider>
  );
}
