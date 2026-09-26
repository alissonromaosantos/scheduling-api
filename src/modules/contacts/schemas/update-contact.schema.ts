import { createContactSchema } from "./create-contact.schema";

export const updateContactSchema = createContactSchema.partial();
