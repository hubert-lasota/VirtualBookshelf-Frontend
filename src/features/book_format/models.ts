import { z } from "zod";

export const bookFormatSchema = z.object({
  id: z.number(),
  name: z.string().min(1),
});

export type BookFormat = z.infer<typeof bookFormatSchema>;
