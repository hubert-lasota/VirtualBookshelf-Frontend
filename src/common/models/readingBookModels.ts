import { z } from "zod";
import { BookResponse, createBookSchema } from "./bookModels";

export enum ReadingStatus {
  READING = "READING",
  READ = "READ",
  WANT_TO_READ = "WANT_TO_READ",
}

export const createReadingBookSchema = (isPlLanguage: boolean) =>
  z
    .object({
      book: createBookSchema(isPlLanguage).extend({
        id: z.number().optional(),
      }),
      status: z.nativeEnum(ReadingStatus, {
        message: isPlLanguage
          ? "Status czytania jest wymagany"
          : "Reading status is required",
      }),
      durationRange: z
        .object({
          startedAt: z.string().optional(),
          finishedAt: z.string().optional(),
        })
        .optional(),
    })
    .superRefine(({ status, durationRange }, ctx) => {
      const needsStart =
        status === ReadingStatus.READING || status === ReadingStatus.READ;

      if (needsStart && !durationRange?.startedAt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["durationRange", "startedAt"],
          message: isPlLanguage
            ? "Data rozpoczęcia jest wymagana"
            : "Start date is required",
        });
      }

      if (status === ReadingStatus.READ && !durationRange?.finishedAt) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["durationRange", "finishedAt"],
          message: isPlLanguage
            ? "Data zakończenia jest wymagana"
            : "Finish date is required",
        });
      }
    });

export type ReadingBookFormValues = z.infer<
  ReturnType<typeof createReadingBookSchema>
>;

export type ReadingBookResponse = {
  id: number;
  book: BookResponse;
  progressPercentage: number;
  currentPage: number;
  totalNotes: number;
  totalSessions: number;
  bookshelf: {
    id: number;
    name: string;
  };
} & (
  | {
      status: ReadingStatus.READING;
      durationRange: {
        startedAt: string;
        finishedAt: null;
      };
    }
  | {
      status: ReadingStatus.READ;
      durationRange: {
        startedAt: string;
        finishedAt: string;
      };
    }
  | {
      status: ReadingStatus.WANT_TO_READ;
      durationRange: null;
    }
);
