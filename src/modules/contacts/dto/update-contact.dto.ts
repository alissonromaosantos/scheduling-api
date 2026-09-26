import { z } from "zod";
import type { updateContactSchema } from "../schemas/update-contact.schema";

export type UpdateContactDTO = z.infer<typeof updateContactSchema>;
