import { env } from "./src/config/env";
import { Config } from "drizzle-kit";

export default {
  schema: "./src/database/schema.ts",
  out: "./src/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: env?.DATABASE_URL!
  }
} satisfies Config;