import { z } from "zod";
import { BaseResponse } from "../../common/api/models";
import { BookFormat } from "../book_format/models";

export function createBookSchema(isPlLanguage: boolean) {
  const authorRequiredMessage = isPlLanguage
    ? "Co najmniej jeden autor jest wymagany"
    : "At least one author is required";

  const seriesNameMinMessages = isPlLanguage
    ? "Nazwa serii musi mieć co najmniej 1 znak"
    : "Series names must contain at least 1 character";

  return z.object({
    title: z
      .string()
      .min(1, isPlLanguage ? "Tytuł jest wymagany" : "Title is required"),

    isbn: z
      .string()
      .regex(/^(?:\d{9}[\dXx]|\d{13})$/, {
        message: isPlLanguage
          ? "Nieprawidłowy numer ISBN (ISBN-10 lub ISBN-13)"
          : "Invalid ISBN (ISBN-10 or ISBN-13)",
      })
      .optional(),

    authors: z
      .array(
        z.object(
          {
            id: z.number().optional(),
            fullName: z.string().min(1, authorRequiredMessage),
          },
          { message: authorRequiredMessage },
        ),
      )
      .min(1, authorRequiredMessage),

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
      )
      .optional(),

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

    languageCode: z.string().optional(),

    coverUrl: z.string().optional(),

    pageCount: z
      .number()
      .int(
        isPlLanguage
          ? "Ilość stron musi być liczbą całkowitą"
          : "Page count must be integer",
      )
      .optional(),

    description: z.string().optional(),
  });
}

export type Book = z.infer<ReturnType<typeof createBookSchema>>;

export type BookResponse = Omit<Book, "formatId"> &
  BaseResponse & {
    format: BookFormat;
  };
