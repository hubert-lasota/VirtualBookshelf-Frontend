import { Pagination, Paper, Rating, Stack, Typography } from "@mui/material";
import { ReviewFormValues, ReviewResponse } from "../../models/reviewModels";
import { useUserContext } from "../../auth/UserContext";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem/ReviewItem";

type ReviewDetailsPaperProps = {
  reviews: ReviewResponse[];
  totalRatings: number;
  averageRating: number;
  onSubmitNewReview: (review: ReviewFormValues) => void;
  page: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

export default function ReviewDetailsPaper({
  reviews,
  totalRatings,
  averageRating,
  onSubmitNewReview,
  page,
  onPageChange,
  totalPages,
}: ReviewDetailsPaperProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return (
    <Stack
      spacing={2}
      component={Paper}
      variant="outlined"
      sx={(theme) => ({ padding: theme.spacing(4) })}
    >
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="h5">
          {isPlLanguage ? "Recenzje" : "Reviews"}
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center">
          <Rating precision={0.5} value={averageRating} readOnly />
          <Typography color="textSecondary" variant="subtitle1">
            {"("}
            {totalRatings}
            {` ${isPlLanguage ? "ocen" : "ratings"}`}
            {")"}
          </Typography>
        </Stack>
      </Stack>
      <ReviewForm onSubmit={onSubmitNewReview} />
      <Stack
        spacing={3}
        sx={(theme) => ({ width: "100%", paddingTop: theme.spacing(3) })}
      >
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </Stack>
      {totalPages > 1 && (
        <Stack direction="row" sx={{ width: "100%", justifyContent: "center" }}>
          <Pagination
            page={page + 1}
            onChange={(_e, page) => onPageChange(page - 1)}
            count={totalPages}
            variant="outlined"
          />
        </Stack>
      )}
    </Stack>
  );
}
