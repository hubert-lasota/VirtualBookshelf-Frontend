import { Book, createBookSchema } from "../book/models";
import { z } from "zod";
import { BaseResponse } from "../../common/api/models";

export type BookshelfBookNote = {
  content: string;
  startPage: number;
  endPage: number;
};

export type BookshelfBook = {
  id: number;
  book: Book;
  notes: BookshelfBookNote[];
};

export type BookshelfBookWithId = BookshelfBook & { bookshelfId: number };

export enum BookshelfType {
  TO_READ = "TO_READ",
  READING = "READING",
  READ = "READ",
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

export function createBookshelfBooksSchema(isPlLanguage: boolean) {
  return z
    .array(
      z.object({
        notes: z
          .array(
            z.object({
              content: z.string(),
              startPage: z.number(),
              endPage: z.number(),
            }),
          )
          .optional(),

        book: createBookSchema(isPlLanguage).extend({
          id: z.number().optional(),
        }),
      }),
    )
    .optional();
}

export type BookshelfBooks = z.infer<
  ReturnType<typeof createBookshelfBooksSchema>
>;

export type BookshelfDetails = z.infer<
  ReturnType<typeof createBookshelfDetailsSchema>
>;

export type Bookshelf = BookshelfDetails;

export type BookshelfResponse = Bookshelf &
  BaseResponse & {
    books: BookshelfBooks;
  };

export type BookshelfUpdate = Pick<BookshelfResponse, "id"> &
  Partial<Bookshelf>;
