import { BookResponse, createBookSchema } from "../book/bookModels";
import { z } from "zod";
import { BaseResponse } from "../../common/api/models";

export enum BookshelfType {
  TO_READ = "TO_READ",
  READING = "READING",
  READ = "READ",
}

export enum BookReadingStatus {
  READING = "READING",
  ENDED = "ENDED",
}

export function createBookshelfDetailsSchema(isPlLanguage: boolean) {
  const requiredNameMessage = isPlLanguage
    ? "Nazwa jest wymagana"
    : "Name is required";

  return z.object({
    name: z
      .string({ message: requiredNameMessage })
      .min(1, requiredNameMessage),
    type: z.nativeEnum(BookshelfType, {
      message: isPlLanguage ? "Typ jest wymagany" : "Type is required",
    }),

    description: z.string().optional(),
  });
}

const createNoteSchema = (isPlLanguage: boolean) => {
  const contentRequired = isPlLanguage
    ? "Treść jest wymagana"
    : "Content is required";

  return z.object({
    content: z.string({ message: contentRequired }).min(1, contentRequired),
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

type Note = z.infer<ReturnType<typeof createNoteSchema>>;

const createBookshelfBookSchema = (isPlLanguage: boolean) =>
  z.object({
    notes: z.array(createNoteSchema(isPlLanguage)).optional(),
    book: createBookSchema(isPlLanguage).extend({
      id: z.number().optional(),
    }),
  });

export const createBookshelfBooksSchema = (isPlLanguage: boolean) =>
  z.array(createBookshelfBookSchema(isPlLanguage)).optional();

export type BookshelfBooks = z.infer<
  ReturnType<typeof createBookshelfBooksSchema>
>;

export type BookshelfDetails = z.infer<
  ReturnType<typeof createBookshelfDetailsSchema>
>;

export type BookshelfCreate = BookshelfDetails & { books: BookshelfBooks };

export type BookshelfBookResponse = {
  book: BookResponse;
  notes: Note[];
} & BaseResponse;

export type BookshelfResponse = BookshelfDetails &
  BaseResponse & {
    books: BookshelfBookResponse[];
  };

export type BookshelfUpdate = Pick<BookshelfResponse, "id"> &
  Partial<BookshelfCreate>;

export type BookshelfBookWithId = BookshelfBookResponse & {
  bookshelfId: number;
};
