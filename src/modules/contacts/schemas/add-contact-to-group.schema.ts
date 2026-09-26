import { z } from "zod";

export const addContactToGroupSchema = z.object({
  contact_id: z.uuid({ error: "O ID do contato deve ser um UUID válido!" }),
  group_id: z.uuid({ error: "O ID do grupo deve ser um UUID válido!" }),
});

export const adminAddContactToGroupSchema = addContactToGroupSchema.extend({
  user_id: z.uuid(),
});
