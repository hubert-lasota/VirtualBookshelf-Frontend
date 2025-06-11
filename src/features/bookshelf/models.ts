import { Book, createBookSchema } from "../book/models";
import { z } from "zod";
import { BaseResponse } from "../../common/models";

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

export function createBookshelfSchema(isPlLanguage: boolean) {
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

    books: z
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
      .optional(),
  });
}

export type Bookshelf = z.infer<ReturnType<typeof createBookshelfSchema>>;

export type BookshelfResponse = Bookshelf & BaseResponse;

export type BookshelfUpdate = Pick<BookshelfResponse, "id"> &
  Partial<Omit<Bookshelf, "id">>;
