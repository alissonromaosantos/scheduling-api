import { Router } from "express";

import { validate } from "../../../../middlewares/validate.middleware";
import { signinController } from "../factories/signin.factories";
import { signinSchema } from "../schemas/signin.schema";

export class SigninRoutes {
  init() {
    const router = Router();

    router.post(
      "/auth/signin",
      validate({ body: signinSchema }),
      signinController.signin,
    );

    return router;
  }
}
