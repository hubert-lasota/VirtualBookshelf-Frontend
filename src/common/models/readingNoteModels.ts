import { z } from "zod";
import { BaseResponse } from "../api/apiModels";

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
    startPage: z
      .number({
        message: isPlLanguage
          ? "Start od jest wymagana"
          : "Page from is required",
      })
      .int(
        isPlLanguage
          ? "Start od musi być poprawną liczbą całkowitą"
          : "Page from must be valid integer",
      ),
    endPage: z
      .number({
        message: isPlLanguage
          ? "Start do jest wymagana"
          : "Page to is required",
      })
      .int(
        isPlLanguage
          ? "Start do musi być poprawną liczbą całkowitą"
          : "Page to must be valid integer",
      ),
  });
};

export type ReadingNoteFormValues = z.infer<
  ReturnType<typeof createReadingNoteSchema>
>;

export type ReadingNoteResponse = BaseResponse & ReadingNoteFormValues;
