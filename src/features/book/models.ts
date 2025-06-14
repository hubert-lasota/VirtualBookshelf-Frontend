import { z } from "zod";
import { BaseResponse } from "../../common/api/models";

export function createBookSchema(isPlLanguage: boolean) {
  const authorRequiredMessage = isPlLanguage
    ? "Co najmniej jeden autor jest wymagany"
    : "At least one author is required";
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
        z.object({
          id: z.number().optional(),
          fullName: z.string().min(1, authorRequiredMessage),
        }),
      )
      .min(1, authorRequiredMessage),

    publisher: z
      .object({
        id: z.number().optional(),
        name: z.string().min(1),
      })
      .optional(),

    format: z
      .object({
        id: z.number(),
        name: z.string().min(1),
      })
      .optional(),

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
          name: z.string().min(1),
          bookOrder: z.number(),
        }),
      )
      .optional(),

    publicationYear: z.number().optional(),

    languageTag: z.string().min(1),

    coverUrl: z.string().min(1).optional(),

    pageCount: z.number({ message: "Must be integer" }).optional(),

    description: z.string().min(1).optional(),
  });
}

export type Book = z.infer<ReturnType<typeof createBookSchema>>;

export type BookResponse = Book & BaseResponse;
