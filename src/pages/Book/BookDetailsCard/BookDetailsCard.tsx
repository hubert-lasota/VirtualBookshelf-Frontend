import { Paper, Stack, Typography } from "@mui/material";

import { useUserContext } from "../../../common/auth/UserContext";
import BookInfoDetails from "./BookInfoDetails";
import BookAuthorLinks from "./BookAuthorLinks";
import { useBookDetailsContext } from "../BookDetailsContext";
import BookCover from "../../../common/components/Book/BookCover";
import GenreStack from "../../../common/components/Book/GenreStack";

export default function BookDetailsCard() {
  const { coverUrl, title, description, genres } = useBookDetailsContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack
      direction="row"
      component={Paper}
      variant="outlined"
      spacing={5}
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        paddingInline: theme.spacing(4),
        paddingBlock: theme.spacing(3),
      })}
    >
      <BookCover coverUrl={coverUrl} sx={{ width: "30%" }} />
      <Stack spacing={3} sx={{ width: "70%" }}>
        <Stack spacing={1}>
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
          <BookAuthorLinks />
          <GenreStack genres={genres} sx={{ paddingBottom: "1.5rem" }} />
        </Stack>
        <Stack spacing={1}>
          <Typography variant="h6">
            {isPlLanguage ? "Opis" : "Description"}
          </Typography>
          <Typography variant="body1" color="textSecondary">
            {description ?? (isPlLanguage ? "Brak opisu" : "No description")}
          </Typography>
        </Stack>
        <BookInfoDetails />
      </Stack>
    </Stack>
  );
}
