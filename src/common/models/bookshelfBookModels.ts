import { z } from "zod";
import {
  BookMutationRequest,
  BookResponse,
  createBookSchema,
} from "./bookModels";
import { BaseResponse } from "../api/apiModels";

export enum BookReadingStatus {
  READING = "READING",
  ENDED = "ENDED",
}

export const createBookshelfBookSchema = (isPlLanguage: boolean) =>
  z.object({
    book: createBookSchema(isPlLanguage).extend({
      id: z.number().optional(),
    }),
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

export type BookshelfBookFormValues = z.infer<
  ReturnType<typeof createBookshelfBookSchema>
>;

export type BookshelfBookMutationRequest = Omit<
  BookshelfBookFormValues,
  "book"
> & {
  book: BookMutationRequest;
};

export type BookshelfBookResponse = {
  book: BookResponse;
  status: BookReadingStatus;
  startedAt: string;
  endedAt: string;
  progressPercentage: number;
  currentPage: number;
} & BaseResponse;
