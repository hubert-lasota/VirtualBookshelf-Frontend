import { z } from "zod";
import { BaseResponse } from "../../common/api/models";
import { BookFormat } from "../book_format/bookFormatModels";

export function createBookSchema(isPlLanguage: boolean) {
  const authorsRequiredMessage = isPlLanguage
    ? "Co najmniej jeden autor jest wymagany"
    : "At least one author is required";

  const seriesNameMinMessages = isPlLanguage
    ? "Nazwa serii musi mieć co najmniej jeden znak"
    : "Series names must contain at least one character";

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

    genres: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z.string().min(1),
        }),
        { message: genreRequiredMessage },
      )
      .min(1, genreRequiredMessage),

    series: z
      .array(
        z.object({
          id: z.number().optional(),
          name: z
            .string({ message: seriesNameMinMessages })
            .min(1, seriesNameMinMessages),
          bookOrder: z
            .number({
              message: isPlLanguage
                ? "Kolejność w serii jest wymagana"
                : "Order in series is required",
            })
            .int(
              isPlLanguage
                ? "Kolejność w serii musi być liczbą całkowitą"
                : "Order in series must be integer",
            )
            .min(1, {
              message: isPlLanguage
                ? "Kolejność w serii musi być równa lub większa 1"
                : "Order in series must be greater or equal to 1",
            }),
        }),
      )
      .optional(),

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

export type BookMutation = z.infer<ReturnType<typeof createBookSchema>>;

export type BookResponse = Omit<BookMutation, "formatId" | "cover"> &
  BaseResponse & {
    format?: BookFormat;
    coverUrl?: string;
  };
