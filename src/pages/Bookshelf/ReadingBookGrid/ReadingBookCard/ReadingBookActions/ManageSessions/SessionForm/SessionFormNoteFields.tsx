import { Button, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../../../../common/auth/UserContext";
import { useFieldArray } from "react-hook-form";
import ControlledTextField from "../../../../../../../common/components/FormInput/ControlledTextField";
import RequiredLabel from "../../../../../../../common/components/Label/RequiredLabel";
import { TITLE_ENTITY_SEPARATOR } from "../../../../../../../common/constants";

export default function SessionFormNoteFields() {
  const { fields, append, remove } = useFieldArray({ name: "notes" });

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack spacing={1}>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6">
          {isPlLanguage ? "Notatki" : "Notes"}
          {` (${fields.length})`}
        </Typography>
        <Button
          onClick={() => append({ title: "", content: "" })}
          variant="contained"
        >
          {isPlLanguage ? "Dodaj notatkę" : "Add note"}
        </Button>
      </Stack>
      {fields.map((field, index) => (
        <Stack
          spacing={2}
          key={field.id}
          sx={(theme) => ({
            padding: theme.spacing(2),
            borderRadius: theme.shape.borderRadius,
            border: `2px solid ${theme.palette.primary.main}`,
          })}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              {isPlLanguage ? "Notatka" : "Note"}
              {TITLE_ENTITY_SEPARATOR}
              {index + 1}
            </Typography>
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => remove(index)}
            >
              {isPlLanguage ? "Usuń" : "Remove"}
            </Button>
          </Stack>

          <ControlledTextField
            name={`notes.${index}.title`}
            label={
              <RequiredLabel
                text={isPlLanguage ? "Tytuł notatki" : "Note title"}
              />
            }
          />

          <ControlledTextField
            name={`notes.${index}.content`}
            multiline
            label={
              <RequiredLabel
                text={isPlLanguage ? "Treść notatki" : "Note content"}
              />
            }
          />
        </Stack>
      ))}
    </Stack>
  );
}
