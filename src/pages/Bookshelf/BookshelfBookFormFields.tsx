import { Grid, Typography } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import BookReadingStatusSelect from "./BookReadingStatusSelect";
import ControlledDatePicker from "../../common/components/FormInput/ControlledDatePicker";
import RequiredLabel from "../../common/components/Label/RequiredLabel";
import ControlledNumberField from "../../common/components/FormInput/ControlledNumberField";

type BookshelfBookFormFieldsProps = {
  namePrefix?: string;
  disableBookFields?: boolean;
};

export default function BookshelfBookFormFields({
  namePrefix = "",
  disableBookFields = false,
}: BookshelfBookFormFieldsProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const fields = [
    <BookReadingStatusSelect namePrefix={namePrefix} />,
    <ControlledDatePicker
      name={`${namePrefix}startedAt`}
      label={
        <RequiredLabel
          text={isPlLanguage ? "Data rozpoczęcia" : "Start date"}
        />
      }
    />,
    <ControlledNumberField
      name={`${namePrefix}currentPage`}
      label={
        <RequiredLabel
          text={isPlLanguage ? "Aktualna strona" : "Current page"}
        />
      }
    />,
  ];

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
