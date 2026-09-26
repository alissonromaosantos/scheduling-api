import type { z } from "zod";
import type {
  updateAdminUserSchema,
  updateOwnUserSchema,
} from "../schemas/create-user.schema";

export type UpdateOwnUserDTO = z.infer<typeof updateOwnUserSchema>;
export type UpdateAdminUserDTO = z.infer<typeof updateAdminUserSchema>;
