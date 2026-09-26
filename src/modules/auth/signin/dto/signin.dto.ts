import { z } from "zod";

import type { signinSchema } from "../schemas/signin.schema";

export type SigninDTO = z.infer<typeof signinSchema>;
