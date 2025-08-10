import { GenreResponse } from "./genreModels";
import { z } from "zod";

export enum ChallengeType {
  BOOK_COUNT = "BOOK_COUNT",
  GENRE_COUNT = "GENRE_COUNT",
  GENRE_BOOKS = "GENRE_BOOKS",
  PAGE_COUNT = "PAGE_COUNT",
  AUTHOR_COUNT = "AUTHOR_COUNT",
}

export const createChallengeSchema = (isPlLanguage: boolean) => {
  const titleRequiredMessage = isPlLanguage
    ? "Tytuł jest wymagany"
    : "Title is required";
  const descriptionRequiredMessage = isPlLanguage
    ? "Opis jest wymagany"
    : "Description is required";

  return z
    .object({
      title: z
        .string({ message: titleRequiredMessage })
        .min(1, titleRequiredMessage)
        .max(
          75,
          isPlLanguage
            ? "Tytuł może mieć maksymalnie 75 znaków"
            : "Title can have maximum of 75 characters",
        ),
      description: z
        .string({ message: descriptionRequiredMessage })
        .min(1, descriptionRequiredMessage)
        .max(
          500,
          isPlLanguage
            ? "Opis może mieć maksymalnie 500 znaków"
            : "Description can have maximum of 500 characters",
        ),
      type: z.nativeEnum(ChallengeType, {
        message: isPlLanguage ? "Typ jest wymagany" : "Type is required",
      }),
      targetCount: z
        .number({
          message: isPlLanguage
            ? "Cel jest wymagany"
            : "Target count is required",
        })
        .int()
        .min(
          1,
          isPlLanguage
            ? "Cel musi być większy od 0"
            : "Target count must be greater than 0",
        ),
      genreId: z.number().optional(),
    })
    .superRefine((data, ctx) => {
      if (data.type === ChallengeType.GENRE_BOOKS && !data.genreId) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: isPlLanguage ? "Gatunek jest wymagany" : "Genre is required",
          path: ["genreId"],
        });
      }
    });
};

export type ChallengeFormValues = z.infer<
  ReturnType<typeof createChallengeSchema>
>;

export type ChallengeResponse = {
  id: number;
  title: string;
  description: string;
  type: ChallengeType;
  targetCount: number;
  startAt: string;
  endAt: string;
  genre: GenreResponse | null;
  totalParticipants: number;
  progressPercentage: number;
};
