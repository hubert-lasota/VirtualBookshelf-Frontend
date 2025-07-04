import { FormProvider, useForm } from "react-hook-form";
import {
  createReviewSchema,
  ReviewFormValues,
  ReviewResponse,
} from "../../models/reviewModels";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "../../auth/UserContext";
import { Button, InputLabel, Stack, Typography } from "@mui/material";
import ControlledRating from "./ControlledRating";
import ControlledTextField from "../FormInput/ControlledTextField";
import RequiredLabel from "../ui/Label/RequiredLabel";
import OptionalLabel from "../ui/Label/OptionalLabel";

type ReviewFormProps = {
  onSubmit: (values: ReviewFormValues) => void;
  review?: ReviewResponse;
};

export default function ReviewForm({ onSubmit, review }: ReviewFormProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const form = useForm<ReviewFormValues>({
    mode: "onSubmit",
    resolver: zodResolver(createReviewSchema(isPlLanguage)),
    defaultValues: review,
  });

  const isEditing = !!review;

  return (
    <FormProvider {...form}>
      <Stack
        component="form"
        onSubmit={form.handleSubmit(onSubmit)}
        sx={(theme) => ({
          backgroundColor: "rgb(249 250 251)",
          borderRadius: theme.spacing(1),
          padding: theme.spacing(2),
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

        <InputLabel>
          <RequiredLabel text={isPlLanguage ? "Ocena" : "Review"} />
        </InputLabel>
        <ControlledRating />
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
        <Button
          type="submit"
          variant="contained"
          sx={{ width: "30%", marginTop: "1rem" }}
        >
          {isPlLanguage
            ? isEditing
              ? "Edytuj recenzję"
              : "Opublikuj recenzję"
            : isEditing
              ? "Edit review"
              : "Publish review"}
        </Button>
      </Stack>
    </FormProvider>
  );
}
