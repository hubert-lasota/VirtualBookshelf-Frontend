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
    setIsFormOpen(false);
  };

  if (isFormOpen) {
    return (
      <ReviewForm
        onSubmit={onSubmit}
        review={review}
        onCancel={() => setIsFormOpen(false)}
      />
    );
  }

  return (
    <ReviewContext.Provider value={review}>
      <Stack
        direction="row"
        spacing={1.5}
        sx={(theme) => ({
          width: "100%",
          "&:not(:last-child)": {
            borderBottom: `1px solid ${theme.palette.divider}`,
            paddingBottom: theme.spacing(3),
          },
        })}
      >
        <Avatar src={profile.pictureUrl} alt={name} />
        <Stack spacing={1.5} sx={{ width: "100%" }}>
          <Stack
            direction="row"
            spacing={5}
            sx={{
              width: "100%",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Stack sx={{ width: "100%" }}>
              <Typography fontWeight={600}>{name}</Typography>
              <Stack direction="row" spacing={1}>
                <Rating value={review.rating} readOnly size="small" />
                <Typography color="textSecondary" variant="subtitle2">
                  {new Date(review.createdAt).toLocaleDateString()}
                </Typography>
              </Stack>
            </Stack>
            <ReviewItemActionsButton onEdit={() => setIsFormOpen(true)} />
          </Stack>

          <Typography color="textSecondary">{review.content}</Typography>
        </Stack>
      </Stack>
    </ReviewContext.Provider>
  );
}
