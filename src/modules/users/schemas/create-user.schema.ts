import { z } from "zod";

const passwordSchema = z
  .string()
  .trim()
  .min(8, { error: "A senha deve possuir pelo menos 8 caracteres!" })
  .regex(/[A-Z]/, { error: "A senha deve conter uma letra maiúscula!" })
  .regex(/[a-z]/, { error: "A senha deve conter uma letra minúscula!" })
  .regex(/\d/, { error: "A senha deve conter um número!" })
  .regex(/[^A-Za-z0-9]/, {
    error: "A senha deve conter um caractere especial!",
  });

const identityFields = {
  fullname: z.string().trim().min(2),
  email: z.string().trim().toLowerCase().email(),
  cpf: z
    .string()
    .trim()
    .regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/),
  phone: z
    .string()
    .trim()
    .regex(/^\(\d{2}\) \d{4,5}-\d{4}$/)
    .nullable()
    .optional(),
  address: z.string().trim().min(1).nullable().optional(),
};

export const createUserSchema = z.object({
  ...identityFields,
  password: passwordSchema,
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

export const updateOwnUserSchema = z
  .object({
    ...identityFields,
    password: passwordSchema.optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "Informe ao menos um campo para atualizar.",
  });

export const updateAdminUserSchema = z
  .object({
    ...identityFields,
    password: passwordSchema.optional(),
    role: z.enum(["USER", "ADMIN"]).optional(),
  })
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    error: "Informe ao menos um campo para atualizar.",
  });
