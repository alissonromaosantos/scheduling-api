import type { z } from "zod";
import type { createUserSchema } from "../schemas/create-user.schema";

export type CreateUserDTO = z.infer<typeof createUserSchema>;
