import OptionalLabel from "../../Label/OptionalLabel";
import RequiredLabel from "../../Label/RequiredLabel";
import AuthorMultipleAutocomplete from "../../author/components/AuthorMultipleAutocomplete";
import { useUserContext } from "../../user/UserContext";
import PublisherAutocomplete from "../../publisher/components/PublisherAutocomplete";
import GenreAutocomplete from "../../genre/components/GenreAutocomplete";
import ControlledNumberField from "../../FormInput/ControlledNumberField";
import LanguageAutocomplete from "../../FormInput/LanguageAutocomplete";
import BookSeriesAutocompleteWithAddButton from "../../book_series/components/BookSeriesAutocompleteWithAddButton";
import { Grid } from "@mui/material";
import ControlledTextField from "../../FormInput/ControlledTextField";
import BookFormatSelect from "../../book_format/components/BookFormatSelect";
import ImageTextFieldWithSelector from "../../FormInput/ImageTextFieldWithSelector";

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
      label: <RequiredLabel text="ISBN" />,
    },
    {
      component: <LanguageAutocomplete name={namePrefix + "languageCode"} />,
    },
    {
      component: (
        <ControlledNumberField
          name={namePrefix + "pageCount"}
          label={
            <RequiredLabel
              text={isPlLanguage ? "Liczba stron" : "Page count"}
            />
          }
        />
      ),
    },
    {
      component: <GenreAutocomplete name={namePrefix + "genreIds"} />,
    },
    {
      component: <PublisherAutocomplete name={namePrefix + "publisher"} />,
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
      component: <BookFormatSelect name={namePrefix + "formatId"} />,
    },
    {
      component: <ImageTextFieldWithSelector name={namePrefix + "cover"} />,
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

  return fields.map(({ component, size, name, ...rest }, index) => (
    <Grid size={size ?? 6} key={`book-form-fields-${index}`}>
      {component ? component : <ControlledTextField name={name!} {...rest} />}
    </Grid>
  ));
}
