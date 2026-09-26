import { z } from "zod";

export const signupSchema = z.object({
  fullname: z
    .string({ error: "O nome completo deve ser um texto!" })
    .trim()
    .min(2, { error: "O nome completo deve possuir pelo menos 2 caracteres!" }),
  email: z
    .string({ error: "O e-mail deve ser um texto!" })
    .trim()
    .toLowerCase()
    .email({ error: "E-mail inválido!" }),
  cpf: z
    .string({ error: "O CPF deve ser um texto!" })
    .trim()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
      error: "CPF deve estar no formato XXX.XXX.XXX-XX!",
    }),
  phone: z
    .string({ error: "O telefone deve ser um texto!" })
    .trim()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/, {
      error:
        "Telefone deve estar no formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX!",
    })
    .optional(),
  address: z
    .string({ error: "O endereço deve ser um texto!" })
    .trim()
    .optional(),
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
