import { z } from "zod";
import type { signupSchema } from "../schemas/signup.schema";

export type SignupDTO = z.infer<typeof signupSchema>;
