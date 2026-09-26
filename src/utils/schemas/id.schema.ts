import { z } from "zod";

export const idSchema = z.object({
  id: z.uuid({ error: "O parâmetro ID deve ser um UUID válido!" })
});