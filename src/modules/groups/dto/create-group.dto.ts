import { z } from "zod";
import type { createGroupSchema } from "../schemas/create-group.schema";

export type CreateGroupDTO = z.infer<typeof createGroupSchema>;
