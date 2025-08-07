import { DialogActions, Grid, Stack, Typography } from "@mui/material";
import CancelButton from "../../../../../common/components/ui/Button/CancelButton";
import SaveButton from "../../../../../common/components/ui/Button/SaveButton";
import { useUserContext } from "../../../../../common/auth/UserContext";
import RequiredLabel from "../../../../../common/components/ui/Label/RequiredLabel";
import ControlledNumberField from "../../../../../common/components/FormInput/ControlledNumberField";
import ControlledTextField from "../../../../../common/components/FormInput/ControlledTextField";
import { FormProvider, useForm } from "react-hook-form";
import {
  ReadingNoteFormValues,
  ReadingNoteResponse,
} from "../../../../../common/models/readingNoteModels";
import { FORM_VALIDATE_MODE } from "../../../../../common/config/form";
import {
  useCreateReadingNote,
  useUpdateReadingNote,
} from "../../../../../common/api/clients/readingNoteClient";
import useManageNotesContext from "./ManageNotesContext";

type NoteFormProps = {
  note?: ReadingNoteFormValues;
  noteId?: ReadingNoteResponse["id"];
  onClose: () => void;
};

export default function NoteForm({ note, noteId, onClose }: NoteFormProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { readingBook } = useManageNotesContext();

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
        name: "pageFrom",
        label: (
          <RequiredLabel text={isPlLanguage ? "Strona od" : "Start page"} />
        ),
      },
    },
    {
      component: ControlledNumberField,
      props: {
        name: "pageTo",
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
              ? `Edytujesz notatkę - ${note?.title}`
              : `You are editing - ${note?.title}`
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
          <SaveButton />
        </DialogActions>
      </Stack>
    </FormProvider>
  );
}
