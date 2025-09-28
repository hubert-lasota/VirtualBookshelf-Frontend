import { z } from "zod";
import {
  createPageRangeSchema,
  createReadingDurationRangeSchema,
  PageRange,
  ReadingDurationRange,
} from "./commonModels";
import { noteContentSchema, noteTileSchema } from "./readingNoteModels";

export const createReadingSessionSchema = (isPlLanguage: boolean) =>
  z.object({
    title: z
      .string({
        message: isPlLanguage ? "Tytuł jest wymagany" : "Title is required",
      })
      .max(50, {
        message: isPlLanguage
          ? "Tytuł może mieć maksymalnie 50 znaków"
          : "Title can be a maximum of 50 characters long.",
      }),
    durationRange: createReadingDurationRangeSchema(isPlLanguage),
    pageRange: createPageRangeSchema(isPlLanguage),
    notes: z
      .array(
        z.object({
          title: noteTileSchema(isPlLanguage),
          content: noteContentSchema(isPlLanguage),
        }),
      )
      .optional(),
  });

export type ReadingSessionFormValues = z.infer<
  ReturnType<typeof createReadingSessionSchema>
>;

export type ReadingSessionResponse = {
  id: number;
  title: string;
  pageRange: PageRange & { readPages: number };
  durationRange: ReadingDurationRange & { readMinutes: number };
  notes: { id: number; title: string; content: string }[];
};
