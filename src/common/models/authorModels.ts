import { z } from "zod";
import { BaseResponse } from "../api/apiModels";

export const createAuthorSchema = (isPlLanguage: boolean) =>
  z.object({
    fullName: z
      .string()
      .min(
        1,
        isPlLanguage
          ? "Imię i nazwisko autora jest wymagane"
          : "Author first and last name is required",
      ),
    photoUrl: z.string().optional(),
    description: z.string().optional(),
  });

export type Author = z.infer<ReturnType<typeof createAuthorSchema>>;

export type AuthorResponse = Author & BaseResponse;
