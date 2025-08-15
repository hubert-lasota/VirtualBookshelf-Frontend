import { useUserContext } from "../../../common/auth/UserContext";
import DescriptionIcon from "@mui/icons-material/Description";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import TagIcon from "@mui/icons-material/Tag";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import ApartmentIcon from "@mui/icons-material/Apartment";
import LanguageIcon from "@mui/icons-material/Language";
import { Grid, Stack, Typography } from "@mui/material";
import { useBookDetailsContext } from "../BookDetailsContext";

export default function BookInfoDetails() {
  const book = useBookDetailsContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const noInfoText = isPlLanguage ? "Brak informacji" : "No information";

  const infoItems = [
    {
      icon: DescriptionIcon,
      label: "Format",
      value: book.format?.name ?? noInfoText,
    },
    {
      icon: CalendarTodayIcon,
      label: isPlLanguage ? "Rok wydania" : "Publication year",
      value: book.publicationYear ?? noInfoText,
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
      value: book.publisher?.name ?? noInfoText,
    },
    {
      icon: LanguageIcon,
      label: isPlLanguage ? "Język" : "Language",
      value: book.languageCode,
    },
  ];

  return (
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
  );
}
