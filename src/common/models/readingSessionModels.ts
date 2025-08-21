import { BookResponse } from "./bookModels";
import { z } from "zod";
import {
  createPageRangeSchema,
  createReadingRangeSchema,
  PageRange,
  ReadingRange,
} from "./commonModels";

export const createReadingSessionSchema = (isPlLanguage: boolean) =>
  z.object({
    readingRange: createReadingRangeSchema(isPlLanguage),
    pageRange: createPageRangeSchema(isPlLanguage),
    description: z.string().optional(),
  });

export type ReadingSessionFormValues = z.infer<
  ReturnType<typeof createReadingSessionSchema>
>;

export type ReadingSessionResponse = {
  id: number;
  pageRange: PageRange;
  readingRange: ReadingRange;
  book: BookResponse;
  description: string | null;
};
