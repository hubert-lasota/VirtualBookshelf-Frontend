import { z } from "zod";
import { BaseResponse } from "../api/apiModels";

const VALID_RATINGS = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

export const createReviewSchema = (isPlLanguage: boolean) =>
  z.object({
    rating: z
      .number({
        message: isPlLanguage ? "Ocena jest wymagana" : "Rating is required",
      })
      .refine((rating) => VALID_RATINGS.includes(rating), {
        message: isPlLanguage
          ? `Ocena musi być wartością jedna z ${VALID_RATINGS}`
          : `Rating must be one of ${VALID_RATINGS}`,
      }),

    content: z.string().min(1).optional(),
  });

export type ReviewFormValues = z.infer<ReturnType<typeof createReviewSchema>>;

export type ReviewResponse = ReviewFormValues &
  BaseResponse & {
    user: {
      id: number;
      profile: {
        firstName: string;
        lastName: string;
        pictureUrl: string;
      };
    };
  };
