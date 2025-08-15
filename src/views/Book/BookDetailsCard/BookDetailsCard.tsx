import { Chip, Paper, Stack, Typography } from "@mui/material";

import { useUserContext } from "../../../common/auth/UserContext";
import BookInfoDetails from "./BookInfoDetails";
import BookAuthorLinks from "./BookAuthorLinks";
import { useBookDetailsContext } from "../BookDetailsContext";
import BookReplacementCover from "../../../common/components/Book/Card/BookReplacementCover";

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
      {coverUrl ? (
        <img src={coverUrl} alt={title} style={{ width: "30%" }} />
      ) : (
        <BookReplacementCover sx={{ width: "30%" }} />
      )}
      <Stack spacing={3} sx={{ width: "70%" }}>
        <Stack spacing={1}>
          <Typography variant="h4" color="textPrimary">
            {title}
          </Typography>
          <BookAuthorLinks />
          <Stack direction="row" sx={{ paddingBottom: "1.5rem" }}>
            {genres.map((genre) => (
              <Chip
                key={genre.id}
                label={genre.name}
                sx={{ borderRadius: "6px", height: "23px" }}
              />
            ))}
          </Stack>
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
