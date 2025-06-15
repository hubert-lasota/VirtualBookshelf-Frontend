import OptionalLabel from "../../../common/components/Label/OptionalLabel";
import RequiredLabel from "../../../common/components/Label/RequiredLabel";
import AuthorMultipleAutocomplete from "../../author/components/AuthorMultipleAutocomplete";
import { useUserContext } from "../../user/UserContext";
import PublisherAutocomplete from "../../publisher/components/PublisherAutocomplete";
import GenreAutocomplete from "../../genre/components/GenreAutocomplete";
import ControlledNumberField from "../../../common/components/FormInput/ControlledNumberField";
import LanguageAutocomplete from "../../../common/components/FormInput/LanguageAutocomplete";
import BookSeriesAutocompleteWithAddButton from "../../book_series/components/BookSeriesAutocompleteWithAddButton";
import { Grid } from "@mui/material";
import ControlledTextField from "../../../common/components/FormInput/ControlledTextField";
import BookFormatSelect from "../../book_format/components/BookFormatSelect";

type BookFormFieldsProps = {
  namePrefix?: string;
};

export default function BookFormFields({
  namePrefix = "",
}: BookFormFieldsProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const fields = [
    {
      name: namePrefix + "title",
      label: <RequiredLabel text={isPlLanguage ? "Tytuł" : "Title"} />,
    },
    {
      component: <AuthorMultipleAutocomplete name={namePrefix + "authors"} />,
    },
    {
      name: namePrefix + "isbn",
      label: <OptionalLabel text="ISBN" />,
    },
    {
      component: <PublisherAutocomplete name={namePrefix + "publisher"} />,
    },
    {
      component: <GenreAutocomplete name={namePrefix + "genres"} />,
    },
    {
      component: (
        <ControlledNumberField
          name={namePrefix + "publicationYear"}
          label={
            <OptionalLabel
              text={isPlLanguage ? "Rok wydania" : "Publication year"}
            />
          }
        />
      ),
    },
    {
      component: (
        <ControlledNumberField
          name={namePrefix + "pageCount"}
          label={
            <OptionalLabel
              text={isPlLanguage ? "Liczba stron" : "Page count"}
            />
          }
        />
      ),
    },
    {
      component: <LanguageAutocomplete name={namePrefix + "languageCode"} />,
    },
    {
      component: <BookFormatSelect name={namePrefix + "formatId"} />,
    },
    {
      name: namePrefix + "coverUrl",
      label: <OptionalLabel text={isPlLanguage ? "Zdjęcie" : "Image"} />,
    },
    {
      name: namePrefix + "description",
      size: 12,
      label: <OptionalLabel text={isPlLanguage ? "Opis" : "Description"} />,
      multiline: true,
    },

    {
      component: (
        <BookSeriesAutocompleteWithAddButton namePrefix={namePrefix} />
      ),
      size: 12,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {fields.map(({ component, size, name, ...rest }, index) => (
        <Grid size={size ?? 6} key={`book-form-fields-${index}`}>
          {component ? (
            component
          ) : (
            <ControlledTextField name={name!} {...rest} />
          )}
        </Grid>
      ))}
    </Grid>
  );
}
