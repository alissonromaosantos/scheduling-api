import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),

  PORT: z.coerce
    .number({ error: "A Porta do servidor deve ser um número!" })
    .int({ error: "A porta do servidor deve ser um número inteiro!" })
    .positive({
      error: "A porta do servidor deve ser um número inteiro positivo!",
    })
    .default(3333),

  CORS_ORIGIN: z
    .string({ error: "O CORS_ORIGIN deve ser um texto (string)!" })
    .url({ error: "O CORS_ORIGIN deve ser uma URL válida!" }),
  DATABASE_URL: z
    .string({ error: "A DATABASE_URL deve ser um texto (string)!" })
    .url({ error: "A DATABASE_URL deve ser uma URL válida!" }),
  JWT_SECRET: z
    .string({ error: "O JWT_SECRET deve ser um texto (string)!" })
    .min(32, { error: "O JWT_SECRET deve ter pelo menos 32 caracteres!" }),
  JWT_EXPIRES_IN: z
    .string({ error: "O JWT_EXPIRES_IN deve ser um texto (string)!" })
    .default("1d"),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error(
    "❌ Variáveis de ambiente inválidas:",
    parsedEnv.error.flatten().fieldErrors,
  );

  process.exit(1);
}

export const env = parsedEnv.data;
