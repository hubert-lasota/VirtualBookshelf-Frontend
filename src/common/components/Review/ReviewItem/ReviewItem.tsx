import { ReviewFormValues, ReviewResponse } from "../../../models/reviewModels";
import { Avatar, Rating, Stack, Typography } from "@mui/material";
import { useState } from "react";
import ReviewForm from "../ReviewForm";
import { useUpdateBookReview } from "../../../api/clients/bookReviewClient";
import { ReviewContext } from "./ReviewContext";
import ReviewItemActionsButton from "./ReviewItemActionsButton";

type ReviewItemProps = {
  review: ReviewResponse;
};

export default function ReviewItem({ review }: ReviewItemProps) {
  const profile = review.user.profile;
  const name = profile.firstName + " " + profile.lastName;
  const [isFormOpen, setIsFormOpen] = useState(false);

  const { mutate } = useUpdateBookReview();

  const onSubmit = (reviewFormValues: ReviewFormValues) => {
    mutate({ review: reviewFormValues, reviewId: review.id });
  };

  if (isFormOpen) {
    return <ReviewForm onSubmit={onSubmit} review={review} />;
  }

  return (
    <ReviewContext.Provider value={review}>
      <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
        <Avatar src={profile.pictureUrl} alt={name} />
        <Stack>
          <Stack direction="row" justifyContent="space-between">
            <Typography>{name}</Typography>
            <ReviewItemActionsButton onEdit={() => setIsFormOpen(true)} />
          </Stack>

          <Stack direction="row" spacing={1}>
            <Rating value={review.rating} readOnly size="small" />
            <Typography color="textSecondary" variant="subtitle2">
              {new Date(review.createdAt).toLocaleDateString()}
            </Typography>
          </Stack>
          <Typography color="textSecondary">{review.content}</Typography>
        </Stack>
      </Stack>
    </ReviewContext.Provider>
  );
}
