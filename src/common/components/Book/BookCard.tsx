import { BookResponse } from "../../models/bookModels";
import { Stack, SxProps, Theme, Typography } from "@mui/material";
import BookCover, { BookCoverProps } from "./BookCover";
import AuthorListTypography from "./AuthorListTypography";
import GenreStack from "./GenreStack";
import { useNavigate } from "react-router-dom";
import ReviewStatsStack from "../Review/ReviewStatsStack";
import { mergeSx } from "../../utils";

type Props = {
  book: BookResponse;
  bookCoverProps?: Omit<BookCoverProps, "coverUrl">;
  sx?: SxProps<Theme>;
};

const containerSx: SxProps<Theme> = (theme) => ({
  borderRadius: theme.shape.borderRadius,
  cursor: "pointer",
  boxShadow: theme.shadows[1],
  transition: theme.transitions.create("box-shadow"),
  "&:hover": {
    boxShadow: theme.shadows[3],
  },
});

export default function BookCard({ book, sx, bookCoverProps }: Props) {
  const navigate = useNavigate();

  return (
    <Stack
      sx={mergeSx(containerSx, sx)}
      onClick={() => navigate(`/books/${book.id}`)}
    >
      <BookCover coverUrl={book.coverUrl} {...bookCoverProps} />
      <Stack
        spacing={1}
        sx={(theme) => ({
          padding: theme.spacing(2),
          borderRadius: theme.shape.borderRadius,
        })}
      >
        <Typography variant="h6">{book.title}</Typography>
        <AuthorListTypography authors={book.authors} />
        <GenreStack genres={book.genres} />
        <ReviewStatsStack
          averageRating={book.averageRating}
          totalReviews={book.totalReviews}
        />
      </Stack>
    </Stack>
  );
}
