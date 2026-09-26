import { z } from "zod";

export const signinSchema = z.object({
  email: z
    .string({ error: "O e-mail deve ser um texto!" })
    .trim()
    .toLowerCase()
    .email({ error: "E-mail inválido!" }),
  password: z
    .string({ error: "A senha deve ser um texto!" })
    .trim()
    .min(8, { error: "A senha deve possuir pelo menos 8 caracteres!" })
    .regex(/[A-Z]/, { error: "A senha deve conter uma letra maiúscula!" })
    .regex(/[a-z]/, { error: "A senha deve conter uma letra minúscula!" })
    .regex(/\d/, { error: "A senha deve conter um número!" })
    .regex(/[^A-Za-z0-9]/, {
      error: "A senha deve conter um caractere especial!",
    }),
});
