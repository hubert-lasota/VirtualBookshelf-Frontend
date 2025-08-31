import { z } from "zod";
import { ReviewResponse, ReviewStatistics } from "./reviewModels";

export const createAuthorSchema = (isPlLanguage: boolean) =>
  z.object({
    fullName: z
      .string()
      .min(
        1,
        isPlLanguage
          ? "Imię i nazwisko autora jest wymagane"
          : "Author first and last name is required",
      ),
    profilePictureUrl: z.string().optional(),
    description: z.string().optional(),
  });

export type AuthorFormValues = z.infer<ReturnType<typeof createAuthorSchema>>;

export type AuthorResponse = {
  id: number;
  fullName: string;
  profilePictureUrl: string | null;
};

export type AuthorDetailsResponse = {
  id: number;
  fullName: string;
  profilePictureUrl: string | null;
  description: string | null;
  reviewStatistics: ReviewStatistics;
  review: ReviewResponse | null;
  createdAt: string;
  updatedAt: string | null;
};
