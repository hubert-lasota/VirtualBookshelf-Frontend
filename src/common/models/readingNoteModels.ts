import { z } from "zod";
import { createPageRangeSchema, PageRange } from "./commonModels";

export const noteTileSchema = (isPlLanguage: boolean) => {
  const titleRequiredMessage = isPlLanguage
    ? "Tytuł jest wymagany"
    : "Title is required";
  return z
    .string({ message: titleRequiredMessage })
    .min(1, titleRequiredMessage)
    .max(
      50,
      isPlLanguage
        ? "Tytuł może mieć maksymalnie 50 znaków"
        : "Title can have maximum of 50 characters",
    );
};

export const noteContentSchema = (isPlLanguage: boolean) => {
  const contentRequiredMessage = isPlLanguage
    ? "Treść jest wymagana"
    : "Content is required";
  return z
    .string({ message: contentRequiredMessage })
    .min(1, contentRequiredMessage);
};

export const createReadingNoteSchema = (isPlLanguage: boolean) =>
  z.object({
    title: noteTileSchema(isPlLanguage),
    content: noteContentSchema(isPlLanguage),

    pageRange: createPageRangeSchema(isPlLanguage),
  });
export type ReadingNoteFormValues = z.infer<
  ReturnType<typeof createReadingNoteSchema>
>;

export type ReadingNoteResponse = {
  id: number;
  title: string;
  content: string;
  pageRange: PageRange;
  createdAt: string;
  updatedAt: string | null;
};
