import { z } from "zod";

export const contactByGroupSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  email: z.email(),
  phone: z.string().nullable(),
  is_active: z.boolean(),
  observations: z.string().nullable(),
  groups: z.array(
    z.object({
      id: z.uuid(),
      name: z.string(),
      contacts_groups_id: z.uuid(),
    }),
  ),
});
