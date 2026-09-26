import { Router } from "express";

import { validate } from "../../../../middlewares/validate.middleware";
import { signupController } from "../factories/signup.factories";
import { signupSchema } from "../schemas/signup.schema";

export class SignupRoutes {
  init() {
    const router = Router();

    router.post(
      "/auth/signup",
      validate({ body: signupSchema }),
      signupController.signup,
    );

    return router;
  }
}
