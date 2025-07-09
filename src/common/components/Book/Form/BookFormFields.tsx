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

type BookFormFieldsProps = {
  namePrefix?: string;
  disableFields?: boolean;
};

export default function BookFormFields({
  namePrefix = "",
  disableFields = false,
}: BookFormFieldsProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const fields = [
    {
      props: {
        name: namePrefix + "title",
        label: <RequiredLabel text={isPlLanguage ? "Tytuł" : "Title"} />,
      },
    },
    {
      component: AuthorAutocomplete,
      props: {
        name: namePrefix + "authors",
      },
    },
    {
      props: {
        name: namePrefix + "isbn",
        label: <RequiredLabel text="ISBN" />,
      },
    },
    {
      component: LanguageAutocomplete,
      props: {
        name: namePrefix + "languageCode",
      },
    },
    {
      component: ControlledNumberField,
      props: {
        name: namePrefix + "pageCount",
        label: (
          <RequiredLabel text={isPlLanguage ? "Liczba stron" : "Page count"} />
        ),
      },
    },
    {
      component: GenreAutocomplete,
      props: {
        name: namePrefix + "genreIds",
      },
    },
    {
      component: PublisherAutocomplete,
      props: {
        name: namePrefix + "publisher",
      },
    },
    {
      component: ControlledNumberField,
      props: {
        name: namePrefix + "publicationYear",
        label: (
          <OptionalLabel
            text={isPlLanguage ? "Rok wydania" : "Publication year"}
          />
        ),
      },
    },
    {
      component: BookFormatSelect,
      props: {
        name: namePrefix + "formatId",
      },
    },
    {
      component: ImageTextFieldWithSelector,
      props: {
        name: namePrefix + "cover",
      },
    },
    {
      props: {
        name: namePrefix + "description",
        label: <OptionalLabel text={isPlLanguage ? "Opis" : "Description"} />,
        multiline: true,
      },
      size: 12,
    },
  ];

  return fields.map(({ component, size, props }, index) => {
    const Field = component || ControlledTextField;

    return (
      <Grid size={size ?? 6} key={`book-form-fields-${index}`}>
        {/*@ts-ignore */}
        <Field {...props} disabled={disableFields} />
      </Grid>
    );
  });
}
