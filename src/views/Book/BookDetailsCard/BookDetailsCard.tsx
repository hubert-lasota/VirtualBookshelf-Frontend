import { Chip, Paper, Stack, Typography } from "@mui/material";
import { BookDetailsResponse } from "../../../common/models/bookModels";
import { useUserContext } from "../../../common/auth/UserContext";
import BookInfoDetails from "./BookInfoDetails";
import BookAuthorLinks from "./BookAuthorLinks";

type BookDetailsCardProps = {
  book: BookDetailsResponse;
};
export default function BookDetailsCard({ book }: BookDetailsCardProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack
      component={Paper}
      variant="outlined"
      sx={(theme) => ({
        borderRadius: theme.shape.borderRadius,
        paddingInline: theme.spacing(4),
        paddingBlock: theme.spacing(3),
      })}
      spacing={3}
    >
      <Stack spacing={1}>
        <Typography variant="h4" color="textPrimary">
          {book.title}
        </Typography>
        <BookAuthorLinks authors={book.authors} />
        <Stack direction="row" sx={{ paddingBottom: "1.5rem" }}>
          {book.genres.map((genre) => (
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
          {book.description || isPlLanguage ? "Brak opisu" : "No description"}
        </Typography>
      </Stack>
      <BookInfoDetails book={book} />
    </Stack>
  );
}
