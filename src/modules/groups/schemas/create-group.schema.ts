import { z } from "zod";

export const createGroupSchema = z.object({
  name: z
    .string({ error: "O nome deve ser do tipo texto (string)!" })
    .trim()
    .min(2, { error: "Nome deve possuir pelo menos 2 caracteres!" }),
});

export const adminCreateGroupSchema = createGroupSchema.extend({
  user_id: z.uuid(),
});
