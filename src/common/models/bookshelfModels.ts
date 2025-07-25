import { z } from "zod";
import { BaseResponse } from "../api/apiModels";

export enum BookshelfType {
  TO_READ = "TO_READ",
  READING = "READING",
  READ = "READ",
}

export function createBookshelfSchema(isPlLanguage: boolean) {
  const requiredNameMessage = isPlLanguage
    ? "Nazwa jest wymagana"
    : "Name is required";

  return z.object({
    name: z
      .string({ message: requiredNameMessage })
      .min(1, requiredNameMessage),
    type: z.nativeEnum(BookshelfType, {
      message: isPlLanguage ? "Typ jest wymagany" : "Type is required",
    }),

    description: z.string().optional().nullable(),
  });
}

export type BookshelfFormValues = z.infer<
  ReturnType<typeof createBookshelfSchema>
>;

export type BookshelfResponse = BookshelfFormValues &
  BaseResponse & {
    totalBooks: number;
  };
