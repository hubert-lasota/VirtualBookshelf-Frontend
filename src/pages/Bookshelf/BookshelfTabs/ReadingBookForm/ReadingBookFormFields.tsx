import { Grid, Typography } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import BookReadingStatusSelect from "./BookReadingStatusSelect";
import ControlledDatePicker from "../../../../common/components/FormInput/ControlledDatePicker";
import RequiredLabel from "../../../../common/components/Label/RequiredLabel";
import BookFormFields from "../../../../common/components/Book/Form/BookFormFields";
import { useWatch } from "react-hook-form";
import { ReadingStatus } from "../../../../common/models/readingBookModels";

type ReadingBookFormFieldsProps = {
  namePrefix?: string;
  disableBookFields?: boolean;
};

export default function ReadingBookFormFields({
  namePrefix = "",
  disableBookFields = false,
}: ReadingBookFormFieldsProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const status: ReadingStatus = useWatch({
    name: namePrefix + "status",
    exact: true,
  });

  const fields = [<BookReadingStatusSelect namePrefix={namePrefix} />];

  if (status === ReadingStatus.READING || status === ReadingStatus.READ) {
    fields.push(
      <ControlledDatePicker
        name={`${namePrefix}durationRange.startedAt`}
        label={
          <RequiredLabel
            text={isPlLanguage ? "Data rozpoczęcia" : "Start date"}
          />
        }
      />,
    );
  }

  if (status === ReadingStatus.READ) {
    fields.push(
      <ControlledDatePicker
        name={`${namePrefix}durationRange.finishedAt`}
        shouldUnregister
        label={
          <RequiredLabel
            text={isPlLanguage ? "Data zakończenia" : "End date"}
          />
        }
      />,
    );
  }

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <BookFormFields
        namePrefix={`${namePrefix}book.`}
        disableFields={disableBookFields}
      />
      <Grid size={12} sx={(theme) => ({ padding: theme.spacing(2) })}>
        <Typography variant="h5">
          {isPlLanguage
            ? "Informacje o stanie czytelnictwa"
            : "Information abaout reading status"}
        </Typography>
      </Grid>
      {fields.map((field) => (
        <Grid size={6}>{field}</Grid>
      ))}
    </Grid>
  );
}
