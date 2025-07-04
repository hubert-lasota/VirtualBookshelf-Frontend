import { Paper, Rating, Stack, Typography } from "@mui/material";
import { ReviewFormValues, ReviewResponse } from "../../models/reviewModels";
import { useUserContext } from "../../auth/UserContext";
import ReviewForm from "./ReviewForm";
import ReviewItem from "./ReviewItem/ReviewItem";

type ReviewDetailsPaperProps = {
  reviews: ReviewResponse[];
  totalRatings: number;
  averageRating: number;
  onSubmitNewReview: (review: ReviewFormValues) => void;
};

export default function ReviewDetailsPaper({
  reviews,
  totalRatings,
  averageRating,
  onSubmitNewReview,
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
      <Stack spacing={2}>
        {reviews.map((review) => (
          <ReviewItem key={review.id} review={review} />
        ))}
      </Stack>
    </Stack>
  );
}
