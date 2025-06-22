import { Grid, Typography } from "@mui/material";
import BookFormFields from "../../../../features/book/components/BookFormFields";
import { useUserContext } from "../../../../features/user/UserContext";
import BookReadingStatusSelect from "../../../../features/bookshelf/components/BookReadingStatusSelect";
import ControlledDatePicker from "../../../../common/components/FormInput/ControlledDatePicker";
import RequiredLabel from "../../../../common/components/Label/RequiredLabel";
import ControlledNumberField from "../../../../common/components/FormInput/ControlledNumberField";

type BookshelfBookFormFieldsProps = {
  index: number;
};

export default function BookshelfBookFormFields({
  index,
}: BookshelfBookFormFieldsProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const fields = [
    <BookReadingStatusSelect namePrefix={`books.${index}.`} />,
    <ControlledDatePicker
      name={`books.${index}.startedAt`}
      label={
        <RequiredLabel
          text={isPlLanguage ? "Data rozpoczęcia" : "Start date"}
        />
      }
    />,
    <ControlledNumberField
      name={`books.${index}.currentPage`}
      label={
        <RequiredLabel
          text={isPlLanguage ? "Aktualna strona" : "Current page"}
        />
      }
    />,
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      <BookFormFields namePrefix={`books.${index}.book.`} />
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
