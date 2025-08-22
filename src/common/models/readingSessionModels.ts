import { BookResponse } from "./bookModels";
import { z } from "zod";
import {
  createPageRangeSchema,
  createReadingDurationRangeSchema,
  PageRange,
  ReadingDurationRange,
} from "./commonModels";

export const createReadingSessionSchema = (isPlLanguage: boolean) =>
  z.object({
    durationRange: createReadingDurationRangeSchema(isPlLanguage),
    pageRange: createPageRangeSchema(isPlLanguage),
    description: z.string().optional(),
  });

export type ReadingSessionFormValues = z.infer<
  ReturnType<typeof createReadingSessionSchema>
>;

export type ReadingSessionResponse = {
  id: number;
  pageRange: PageRange & { readPages: number };
  durationRange: ReadingDurationRange & { readMinutes: number };
  book: BookResponse;
  description: string | null;
};
