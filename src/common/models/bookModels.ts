import { z } from "zod";
import { BaseResponse } from "../api/apiModels";
import { BookFormat } from "./bookFormatModels";
import { GenreResponse } from "./genreModels";
import { ReviewResponse, ReviewStatistics } from "./reviewModels";

export function createBookSchema(isPlLanguage: boolean) {
  const authorsRequiredMessage = isPlLanguage
    ? "Co najmniej jeden autor jest wymagany"
    : "At least one author is required";

  const genreRequiredMessage = isPlLanguage
    ? "Co najmniej jeden gatunek jest wymagany"
    : "At least one genre is required";

  const titleRequiredMessage = isPlLanguage
    ? "Tytuł jest wymagany"
    : "Title is required";

  return z.object({
    title: z
      .string({ message: titleRequiredMessage })
      .min(1, titleRequiredMessage),

    isbn: z
      .string({
        message: isPlLanguage ? "ISBN jest wymagany" : "ISBN is required",
      })
      .regex(/^(?:\d{9}[\dXx]|\d{13})$/, {
        message: isPlLanguage
          ? "Nieprawidłowy numer ISBN (ISBN-10 lub ISBN-13)"
          : "Invalid ISBN (ISBN-10 or ISBN-13)",
      }),

    authors: z
      .array(
        z.object(
          {
            id: z.number().optional(),
            fullName: z.string().min(1, authorsRequiredMessage),
          },
          { message: authorsRequiredMessage },
        ),
        { message: authorsRequiredMessage },
      )
      .min(1, authorsRequiredMessage),

    publisher: z
      .object({
        id: z.number().optional(),
        name: z.string().min(1),
      })
      .optional(),

    formatId: z.number().optional(),

    genreIds: z
      .array(z.number(), { message: genreRequiredMessage })
      .min(1, genreRequiredMessage),

    publicationYear: z
      .number()
      .int(
        isPlLanguage
          ? "Rok wydania musi być liczbą całkowitą"
          : "Publication year must be integer",
      )
      .optional(),

    languageCode: z.string({
      message: isPlLanguage ? "Język jest wymagany" : "Language is required",
    }),

    cover: z
      .union([
        z.instanceof(File),
        z
          .string()
          .url(
            isPlLanguage
              ? "Niepoprawny link do zdjęcia okładki"
              : "Invalid link to cover image",
          ),
      ])
      .optional(),

    pageCount: z
      .number({
        message: isPlLanguage
          ? "Ilość stron jest wymagana"
          : "Page count is required",
      })
      .int(
        isPlLanguage
          ? "Ilość stron musi być liczbą całkowitą"
          : "Page count must be integer",
      ),

    description: z.string().optional(),
  });
}

export type BookFormValues = z.infer<ReturnType<typeof createBookSchema>>;

export type BookResponse = Omit<
  BookFormValues,
  "formatId" | "cover" | "genreIds"
> &
  BaseResponse & {
    format?: BookFormat;
    coverUrl?: string;
    genres: GenreResponse[];
    reviewStatistics: ReviewStatistics;
  };

export type BookDetailsResponse = BookResponse & {
  userReview: ReviewResponse;
};
