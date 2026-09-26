import { z } from "zod";

export const createContactSchema = z.object({
  name: z
    .string({ error: "O nome deve ser do tipo texto (string)!" })
    .trim()
    .min(2, { error: "Nome deve possuir pelo menos 2 caracteres!" }),
  email: z
    .string({ error: "O e-mail deve ser do tipo texto (string)!" })
    .trim()
    .email({ error: "E-mail inválido!" })
    .toLowerCase(),
  phone: z
    .string({ error: "O telefone deve ser do tipo texto (string)!" })
    .trim()
    .regex(
      /^\(\d{2}\) \d{4,5}-\d{4}$/,
      "Telefone deve estar no formato brasileiro. Ex: (99) 9999-9999 ou (99) 99999-9999.",
    )
    .optional(),
});

export const adminCreateContactSchema = createContactSchema.extend({
  user_id: z.uuid(),
});
