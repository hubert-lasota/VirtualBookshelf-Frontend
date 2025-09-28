import { z } from "zod";
import {
  createPageRangeSchema,
  createReadingDurationRangeSchema,
  PageRange,
  ReadingDurationRange,
} from "./commonModels";
import { ReadingNoteResponse } from "./readingNoteModels";

export const createReadingSessionSchema = (isPlLanguage: boolean) =>
  z.object({
    durationRange: createReadingDurationRangeSchema(isPlLanguage),
    pageRange: createPageRangeSchema(isPlLanguage),
    notes: z
      .array(z.object({ title: z.string(), content: z.string() }))
      .optional(),
  });

export type ReadingSessionFormValues = z.infer<
  ReturnType<typeof createReadingSessionSchema>
>;

export type ReadingSessionResponse = {
  id: number;
  pageRange: PageRange & { readPages: number };
  durationRange: ReadingDurationRange & { readMinutes: number };
  notes: ReadingNoteResponse[];
};
