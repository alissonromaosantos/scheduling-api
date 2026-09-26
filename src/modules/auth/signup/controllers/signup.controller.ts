import type { NextFunction, Request, Response } from "express";

import type { SignupDTO } from "../dto/signup.dto";
import type { SignupService } from "../services/signup.service";

export class SignupController {
  constructor(private readonly signupService: SignupService) {}

  signup = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = response.locals.validated.body as SignupDTO;
      await this.signupService.signup(data);

      response.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}
