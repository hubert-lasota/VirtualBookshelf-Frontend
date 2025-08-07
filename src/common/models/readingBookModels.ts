import { z } from "zod";
import { BookResponse, createBookSchema } from "./bookModels";

export enum ReadingStatus {
  READING = "READING",
  READ = "READ",
  WANT_TO_READ = "WANT_TO_READ",
}

export const createReadingBookSchema = (isPlLanguage: boolean) =>
  z.object({
    book: createBookSchema(isPlLanguage).extend({
      id: z.number().optional(),
    }),
    status: z.nativeEnum(ReadingStatus, {
      message: isPlLanguage
        ? "Status czytania jest wymagany"
        : "Reading status is required",
    }),
    startedReadingAt: z.string({
      message: isPlLanguage
        ? "Data rozpoczęcia jest wymagana"
        : "Start date is required",
    }),
  });

export type ReadingBookFormValues = z.infer<
  ReturnType<typeof createReadingBookSchema>
>;

export type ReadingBookResponse = {
  id: number;
  book: BookResponse;
  status: ReadingStatus;
  startedReadingAt: string;
  endedReadingAt: string;
  progressPercentage: number;
  currentPage: number;
  totalNotes: number;
  bookshelf: {
    id: number;
    name: string;
  };
};
