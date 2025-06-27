import { z } from "zod";
import { BookshelfBookResponse } from "./bookshelfModels";
import { BookMutationRequest, createBookSchema } from "./bookModels";

export enum BookReadingStatus {
  READING = "READING",
  ENDED = "ENDED",
}

const createBookshelfBookNoteSchema = (isPlLanguage: boolean) => {
  const contentRequiredMessage = isPlLanguage
    ? "Treść jest wymagana"
    : "Content is required";

  const titleRequiredMessage = isPlLanguage
    ? "Tytuł jest wymagany"
    : "Title is required";

  return z.object({
    title: z
      .string({ message: titleRequiredMessage })
      .min(1, titleRequiredMessage)
      .max(
        50,
        isPlLanguage
          ? "Tytuł może mieć maksymalnie 50 znaków"
          : "Title can have maximum of 50 characters",
      ),
    content: z
      .string({ message: contentRequiredMessage })
      .min(1, contentRequiredMessage),
    startPage: z
      .number({
        message: isPlLanguage
          ? "Start od jest wymagana"
          : "Page from is required",
      })
      .int(
        isPlLanguage
          ? "Start od musi być poprawną liczbą całkowitą"
          : "Page from must be valid integer",
      ),
    endPage: z
      .number({
        message: isPlLanguage
          ? "Start do jest wymagana"
          : "Page to is required",
      })
      .int(
        isPlLanguage
          ? "Start do musi być poprawną liczbą całkowitą"
          : "Page to must be valid integer",
      ),
  });
};

export type BookshelfBookNote = z.infer<
  ReturnType<typeof createBookshelfBookNoteSchema>
>;

export const createBookshelfBookSchema = (isPlLanguage: boolean) =>
  z.object({
    book: createBookSchema(isPlLanguage).extend({
      id: z.number().optional(),
    }),
    notes: z
      .array(createBookshelfBookNoteSchema(isPlLanguage))
      .optional()
      .nullable(),
    status: z.nativeEnum(BookReadingStatus, {
      message: isPlLanguage
        ? "Status czytania jest wymagany"
        : "Reading status is required",
    }),
    currentPage: z
      .number({
        message: isPlLanguage
          ? "Aktualna strona jest wymagana"
          : "Current page is required",
      })
      .int()
      .min(
        1,
        isPlLanguage
          ? "Aktualna strona nie może być mniejsza od 1"
          : "Current page cannot be lower than 1",
      ),
    startedAt: z.string({
      message: isPlLanguage
        ? "Data rozpoczęcia jest wymagana"
        : "Start date is required",
    }),
  });

export type BookshelfBook = z.infer<
  ReturnType<typeof createBookshelfBookSchema>
>;

export type BookshelfBookMutationRequest = Omit<BookshelfBook, "book"> & {
  book: BookMutationRequest;
};

export type BookshelfBookWithBookshelfHeader = BookshelfBookResponse & {
  bookshelf: { id: number; name: string };
};
