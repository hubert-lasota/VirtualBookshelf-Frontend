import { BookResponse } from "./bookModels";
import { z } from "zod";
import { BaseResponse } from "../api/apiModels";
import {
  BookReadingStatus,
  BookshelfBookMutationRequest,
  BookshelfBookNote,
  createBookshelfBookSchema,
} from "./bookshelfBookModels";

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

export type BookshelfDetailsFormValues = z.infer<
  ReturnType<typeof createBookshelfDetailsSchema>
>;

export const createBookshelfBooksSchema = (isPlLanguage: boolean) =>
  z.object({
    books: z.array(createBookshelfBookSchema(isPlLanguage)).optional(),
  });

export type BookshelfBooksFormValues = z.infer<
  ReturnType<typeof createBookshelfBooksSchema>
>;

export type BookshelfFormValues = BookshelfDetailsFormValues &
  BookshelfBooksFormValues;

export type BookshelfMutationRequest = BookshelfFormValues & {
  books?: BookshelfBookMutationRequest[];
  bookCovers?: {
    cover: File;
    bookIndex: number;
  }[];
};

export type BookshelfBookResponse = {
  book: BookResponse;
  notes: BookshelfBookNote[];
  status: BookReadingStatus;
  startedAt: string;
  endedAt: string;
  progressPercentage: number;
  currentPage: number;
} & BaseResponse;

export type BookshelfResponse = BookshelfDetailsFormValues &
  BaseResponse & {
    books: BookshelfBookResponse[];
  };
