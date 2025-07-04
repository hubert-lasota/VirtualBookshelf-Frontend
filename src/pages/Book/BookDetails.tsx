import { BookResponse } from "../../common/models/bookModels";
import BookCard from "../../common/components/Book/Card/BookCard";
import { Chip, Grid, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../common/auth/UserContext";
import DescriptionIcon from "@mui/icons-material/Description";
import TagIcon from "@mui/icons-material/Tag";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ApartmentIcon from "@mui/icons-material/Apartment";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import LanguageIcon from "@mui/icons-material/Language";

type BookDetailsProps = {
  book: BookResponse;
};

export default function BookDetails({ book }: BookDetailsProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const infoItems = [
    {
      icon: DescriptionIcon,
      label: "Format",
      value: book.format || isPlLanguage ? "Brak" : "No format",
    },
    {
      icon: CalendarTodayIcon,
      label: isPlLanguage ? "Rok wydania" : "Publication year",
      value:
        book.publicationYear || isPlLanguage ? "Brak" : "No publication year",
    },
    {
      icon: TagIcon,
      label: "ISBN",
      value: book.isbn,
    },
    {
      icon: MenuBookIcon,
      label: isPlLanguage ? "Liczba stron" : "Number of pages",
      value: book.pageCount,
    },
    {
      icon: ApartmentIcon,
      label: isPlLanguage ? "Wydawnictwo" : "Publisher",
      value: book.publisher || isPlLanguage ? "Brak" : "No publisher",
    },
    {
      icon: LanguageIcon,
      label: isPlLanguage ? "Język" : "Language",
      value: book.languageCode,
    },
  ];

  return (
    <BookCard
      book={book}
      sx={(theme) => ({ padding: theme.spacing(4) })}
      variant="outlined"
      component={Stack}
      // @ts-ignore
      spacing={1}
    >
      <BookCard.Title sx={{ fontSize: "1.9rem" }} />
      <BookCard.Authors sx={{ fontSize: "1.1rem" }} color="textSecondary" />
      <Stack direction="row" sx={{ paddingBottom: "1.5rem" }}>
        {book.genres.map((genre) => (
          <Chip
            key={genre.id}
            label={genre.name}
            sx={{ borderRadius: "6px", height: "23px" }}
          />
        ))}
      </Stack>
      <Typography variant="h6">
        {isPlLanguage ? "Opis" : "Description"}
      </Typography>
      <Typography variant="body1" color="textSecondary">
        {book.description || isPlLanguage ? "Brak opisu" : "No description"}
      </Typography>
      <Grid container sx={{ paddingTop: "1.5rem" }} spacing={2}>
        {infoItems.map(({ icon: Icon, label, value }) => (
          <Grid
            key={`${label}${value}`}
            size={6}
            component={Stack}
            sx={{ flexDirection: "row", alignItems: "center", gap: "0.75rem" }}
          >
            <Icon
              sx={(theme) => ({
                fontSize: "20px",
                color: theme.palette.text.secondary,
              })}
            />
            <Stack>
              <Typography color="textSecondary" variant="subtitle2">
                {label}
              </Typography>
              <Typography fontWeight={500}>{value}</Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </BookCard>
  );
}
