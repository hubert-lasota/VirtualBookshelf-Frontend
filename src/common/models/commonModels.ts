import { z } from "zod";
import dayjs from "dayjs";

export const createPageRangeSchema = (isPlLanguage: boolean) =>
  z
    .object({
      from: z
        .number({
          message: isPlLanguage
            ? "Strona od jest wymagana"
            : `Start page is required`,
        })
        .min(1, {
          message: isPlLanguage
            ? `Strona od musi być większe od 0`
            : `Start page must be greater than 0`,
        })
        .int({
          message: isPlLanguage
            ? "Strona od musi być liczbą całkowitą"
            : "Start page must be integer",
        }),
      to: z
        .number({
          message: isPlLanguage
            ? `Strona do jest wymagana`
            : `End page is required`,
        })
        .min(1, {
          message: isPlLanguage
            ? "Strona do musi być większa od 0"
            : "End page must be greater than 0",
        })
        .int({
          message: isPlLanguage
            ? "Strona do musi być liczbą całkowitą"
            : "End page must be integer",
        }),
    })
    .superRefine(({ from, to }, ctx) => {
      if (from > to) {
        ctx.addIssue({
          path: ["to"],
          code: z.ZodIssueCode.custom,
          message: isPlLanguage
            ? `Strona od nie może być większa niż Strona do`
            : `Start page cannot be greater than End page`,
        });
      }
    });

export const createReadingDurationRangeSchema = (isPlLanguage: boolean) =>
  z
    .object({
      startedAt: z.string({
        message: isPlLanguage
          ? `Data i czas rozpoczęcia jest wymagana`
          : `Start datetime is required`,
      }),
      finishedAt: z.string({
        message: isPlLanguage
          ? `Data i czas zakończenia jest wymagana`
          : `Finish datetime is required`,
      }),
    })
    .superRefine(({ startedAt, finishedAt }, ctx) => {
      if (dayjs(startedAt).isAfter(dayjs(finishedAt))) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["finishedAt"],
          message: isPlLanguage
            ? `Rozpoczęcie musi być późniejszą datą niż zakończenie`
            : `Start must be later than finish`,
        });
      }
    });

export type PageRange = {
  from: number;
  to: number;
};

export type ReadingDurationRange = {
  startedAt: string;
  finishedAt: string;
};

export type RangeFilter = {
  lte?: number;
  gte?: number;
};
