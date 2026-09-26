import { z } from "zod";

export const adminOwnerFilterSchema = z.object({
  user_id: z
    .uuid({ error: "O parâmetro ID deve ser um UUID válido" })
    .optional(),
});
