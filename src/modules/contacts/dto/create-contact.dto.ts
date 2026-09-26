import { z } from "zod";
import type { createContactSchema } from "../schemas/create-contact.schema";

export type CreateContactDTO = z.infer<typeof createContactSchema>;
