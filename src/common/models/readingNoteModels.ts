import { z } from "zod";
import { createPageRangeSchema, PageRange } from "./commonModels";

export const createReadingNoteSchema = (isPlLanguage: boolean) => {
  const contentRequiredMessage = isPlLanguage
    ? "Treść jest wymagana"
    : "Content is required";

  const titleRequiredMessage = isPlLanguage
    ? "Tytuł jest wymagany"
    : "Title is required";

  return z.object({
    title: z
      .string({ message: titleRequiredMessage })
      .min(1, titleRequiredMessage)
      .max(
        50,
        isPlLanguage
          ? "Tytuł może mieć maksymalnie 50 znaków"
          : "Title can have maximum of 50 characters",
      ),
    content: z
      .string({ message: contentRequiredMessage })
      .min(1, contentRequiredMessage),

    pageRange: createPageRangeSchema(isPlLanguage),
  });
};

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
