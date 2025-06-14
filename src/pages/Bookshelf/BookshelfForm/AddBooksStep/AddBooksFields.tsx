import { Grid } from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import RequiredLabel from "../../../../common/components/Label/RequiredLabel";
import AuthorMultipleAutocomplete from "../../../../features/author/components/AuthorMultipleAutocomplete";
import OptionalLabel from "../../../../common/components/Label/OptionalLabel";
import ControlledTextField from "../../../../common/components/FormInput/ControlledTextField";
import PublisherAutocomplete from "../../../../features/publisher/components/PublisherAutocomplete";
import GenreAutocomplete from "../../../../features/genre/components/GenreAutocomplete";
import BookFormatSelect from "../../../../features/book_format/components/BookFormatSelect";
import BookSeriesAutocompleteWithAddButton from "../../../../features/book_series/components/BookSeriesAutocompleteWithAddButton";
import LanguageAutocomplete from "../../../../common/components/FormInput/LanguageAutocomplete";
// TODO do osobnego komponentu pola ksiazek, przesylac jedynie name dla kazdego pola np isbnName, titleName
export default function AddBooksFields({ index }: { index: number }) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const fields = [
    {
      name: `books.${index}.title`,
      label: <RequiredLabel text={isPlLanguage ? "Tytuł" : "Title"} />,
    },
    {
      component: <AuthorMultipleAutocomplete name={`books.${index}.authors`} />,
    },
    {
      name: `books.${index}.isbn`,
      label: <OptionalLabel text="ISBN" />,
    },
    {
      component: <PublisherAutocomplete name={`books.${index}.publisher`} />,
    },
    {
      component: <GenreAutocomplete name={`books.${index}.genres`} />,
    },
    {
      name: `books.${index}.publicationYear`,
      label: (
        <OptionalLabel
          text={isPlLanguage ? "Rok wydania" : "Publication year"}
        />
      ),
    },
    {
      name: `books.${index}.pageCount`,
      label: (
        <OptionalLabel text={isPlLanguage ? "Liczba stron" : "Page count"} />
      ),
    },
    {
      component: <LanguageAutocomplete name={`books.${index}.language`} />,
    },
    {
      component: <BookFormatSelect name={`books.${index}.format`} />,
    },
    {
      name: `books.${index}.coverUrl`,
      label: <OptionalLabel text={isPlLanguage ? "Zdjęcie" : "Image"} />,
    },
    {
      name: `books.${index}.description`,
      size: 12,
      label: <OptionalLabel text={isPlLanguage ? "Opis" : "Description"} />,
      multiline: true,
    },

    {
      component: (
        <BookSeriesAutocompleteWithAddButton namePrefix={`books.${index}.`} />
      ),
      size: 12,
    },
  ];

  return (
    <Grid container spacing={2} sx={{ mt: 3 }}>
      {fields.map(({ component, size, name, ...rest }, index) => (
        <Grid size={size ?? 6} key={`add-books-fields-${index}`}>
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
