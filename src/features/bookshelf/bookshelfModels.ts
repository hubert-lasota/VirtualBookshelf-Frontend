import { BookFormValues, BookResponse } from "../book/bookModels";
import { z } from "zod";
import { BaseResponse } from "../../common/api/models";
import { BookReadingStatus, BookshelfBookNote } from "./bookshelfBookModels";

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

    description: z.string().optional().nullable(),
  });
}

export type BookshelfDetails = z.infer<
  ReturnType<typeof createBookshelfDetailsSchema>
>;

export type BookshelfFormValues = BookshelfDetails & {
  books: (BookFormValues | BookResponse)[];
};

export type BookshelfBookResponse = {
  book: BookResponse;
  notes: BookshelfBookNote[];
  status: BookReadingStatus;
  progressPercentage: number;
} & BaseResponse;

export type BookshelfResponse = BookshelfDetails &
  BaseResponse & {
    books: BookshelfBookResponse[];
  };
