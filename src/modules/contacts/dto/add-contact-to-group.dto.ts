import { z } from "zod";
import type { addContactToGroupSchema } from "../schemas/add-contact-to-group.schema";

export type AddContactToGroupDTO = z.infer<typeof addContactToGroupSchema>;
