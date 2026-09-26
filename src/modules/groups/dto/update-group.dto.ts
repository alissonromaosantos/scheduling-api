import { z } from "zod";
import type { updateGroupSchema } from "../schemas/update-group.schema";

export type UpdateGroupDTO = z.infer<typeof updateGroupSchema>;