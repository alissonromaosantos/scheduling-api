import { z } from "zod";
import type { removeContactFromGroupParamsSchema } from "../schemas/remove-contact-from-group.schema";

export type RemoveContactFromGroupDTO = z.infer<
  typeof removeContactFromGroupParamsSchema
>;
