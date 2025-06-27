import OptionalLabel from "../../ui/Label/OptionalLabel";
import RequiredLabel from "../../ui/Label/RequiredLabel";
import ControlledNumberField from "../../FormInput/ControlledNumberField";
import LanguageAutocomplete from "../../FormInput/LanguageAutocomplete";
import { Grid } from "@mui/material";
import ControlledTextField from "../../FormInput/ControlledTextField";
import ImageTextFieldWithSelector from "../../FormInput/ImageTextFieldWithSelector";
import { useUserContext } from "../../../auth/UserContext";
import AuthorAutocomplete from "./AuthorAutocomplete";
import GenreAutocomplete from "./GenreAutocomplete";
import PublisherAutocomplete from "./PublisherAutocomplete";
import BookFormatSelect from "./BookFormatSelect";
import BookSeriesAutocompleteWithAddButton from "./BookSeries/BookSeriesAutocompleteWithAddButton";

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
      component: <AuthorAutocomplete name={namePrefix + "authors"} />,
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
