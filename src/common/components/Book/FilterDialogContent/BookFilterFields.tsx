import { useUserContext } from "../../../auth/UserContext";
import GenreFilterSelect from "./GenreFilterSelect";
import { Grid } from "@mui/material";
import AuthorFilterSelect from "./AuthorFilterSelect";
import BookFormatFilterSelect from "./BookFormatFilterSelect";
import NumberRangeField from "./NumberRangeField";

export default function BookFilterFields() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const yearRangeProps = {
    namePrefix: "publicationYearRange",
    labelPrefix: isPlLanguage ? "Rok publikacji" : "Publication year",
  };
  const pageRangeProps = {
    namePrefix: "pageCountRange",
    labelPrefix: isPlLanguage ? "Liczba stron" : "Page count",
  };

  const components = [
    <GenreFilterSelect />,
    <AuthorFilterSelect />,
    <BookFormatFilterSelect />,
    <NumberRangeField rangeField="lte" {...yearRangeProps} />,
    <NumberRangeField rangeField="gte" {...yearRangeProps} />,
    <NumberRangeField rangeField="lte" {...pageRangeProps} />,
    <NumberRangeField rangeField="gte" {...pageRangeProps} />,
  ];

  return (
    <Grid container spacing={2}>
      {components.map((component) => (
        <Grid size={6}>{component}</Grid>
      ))}
    </Grid>
  );
}
