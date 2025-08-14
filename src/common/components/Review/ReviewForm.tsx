import { FormProvider, useForm } from "react-hook-form";
import {
  createReviewSchema,
  ReviewFormValues,
  ReviewResponse,
} from "../../models/reviewModels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../auth/UserContext";
import { Button, Stack, Typography } from "@mui/material";
import ControlledRating from "./ControlledRating";
import ControlledTextField from "../FormInput/ControlledTextField";
import OptionalLabel from "../ui/Label/OptionalLabel";
import CancelButton from "../ui/Button/CancelButton";

type ReviewFormProps = {
  onSubmit: (values: ReviewFormValues) => void;
  review?: ReviewResponse;
  onCancel?: () => void;
};

export default function ReviewForm({
  onSubmit,
  review,
  onCancel,
}: ReviewFormProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const reviewFormValues: ReviewFormValues | undefined = review
    ? {
        ...review,
        content: review.content ?? undefined,
      }
    : undefined;

  const form = useForm<ReviewFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(createReviewSchema(isPlLanguage)),
    defaultValues: reviewFormValues,
  });

  const isEditing = !!review;

  return (
    <FormProvider {...form}>
      <Stack
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        sx={(theme) => ({
          borderRadius: theme.shape.borderRadius,
          padding: theme.spacing(3),
          border: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Typography variant="h6">
          {isPlLanguage
            ? isEditing
              ? "Edytujesz recenzję"
              : "Dodaj swoją recenzję"
            : isEditing
              ? "You are editing review"
              : "Add your review"}
        </Typography>

        <Stack direction="row" spacing={1}>
          <Typography color="textSecondary">
            {isPlLanguage ? "Ocena:" : "Rating:"}
          </Typography>
          <ControlledRating />
        </Stack>
        <ControlledTextField
          sx={{ marginTop: "0.5rem" }}
          name="content"
          multiline
          label={
            <OptionalLabel
              text={isPlLanguage ? "Treść oceny" : "Review content"}
            />
          }
        />
        <Stack
          direction="row"
          spacing={2}
          sx={{ width: "100%", marginTop: "1rem" }}
        >
          <Button type="submit" variant="contained">
            {isPlLanguage
              ? isEditing
                ? "Edytuj recenzję"
                : "Opublikuj recenzję"
              : isEditing
                ? "Edit review"
                : "Publish review"}
          </Button>
          {onCancel && <CancelButton onClick={onCancel} />}
        </Stack>
      </Stack>
    </FormProvider>
  );
}
