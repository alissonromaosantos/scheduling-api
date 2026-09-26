import { z } from "zod";

export const searchByNameSchema = z.object({
  name: z.string({ error: "O nome a ser buscado na query deve ser do tipo texto (string)!" }).trim(),
});