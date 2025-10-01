import { GenreResponse } from "./genreModels";
import { z } from "zod";
import { ChallengeParticipantStatus } from "./challengePartictipantModels";
import { UserResponse } from "./userModels";
import { DateRangeFilter } from "./commonModels";
import { ApiSort } from "../api/apiModels";

export enum ChallengeType {
  BOOK_COUNT = "BOOK_COUNT",
  GENRE_COUNT = "GENRE_COUNT",
  GENRE_BOOKS = "GENRE_BOOKS",
  PAGE_COUNT = "PAGE_COUNT",
  AUTHOR_COUNT = "AUTHOR_COUNT",
}

const createDurationRangeSchema = (isPlLanguage: boolean) =>
  z.object({
    startAt: z.string({
      message: isPlLanguage
        ? "Data rozpoczęcia jest wymagana"
        : "Start date is required",
    }),
    endAt: z.string({
      message: isPlLanguage
        ? "Data zakończenia jest wymagana"
        : "End date is required",
    }),
  });

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
      goalValue: z
        .number({
          message: isPlLanguage
            ? "Wartość celu jest wymagana"
            : "Goal value is required",
        })
        .int()
        .min(
          1,
          isPlLanguage
            ? "Cel musi być większy od 0"
            : "Target count must be greater than 0",
        ),
      durationRange: createDurationRangeSchema(isPlLanguage),
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

type Participation =
  | {
      participates: true;
      currentGoalValue: number;
      progressPercentage: number;
      status: ChallengeParticipantStatus;
      startedAt: string;
      finishedAt: string | null;
    }
  | {
      participates: false;
      currentGoalValue: null;
      progressPercentage: null;
      status: null;
      startedAt: null;
      finishedAt: null;
    };

export type ChallengeResponse = {
  id: number;
  title: string;
  description: string;
  type: ChallengeType;
  goalValue: number;
  durationRange: {
    startAt: string;
    endAt: string;
  };
  genre: GenreResponse | null;
  totalParticipants: number;
  participation: Participation;
  user: UserResponse;
};

export type ChallengeFilter = {
  participating?: boolean;
  query?: string;
  durationRange?: DateRangeFilter;
  type?: ChallengeType;
  page?: number;
  size?: number;
  sort?: ApiSort;
};
