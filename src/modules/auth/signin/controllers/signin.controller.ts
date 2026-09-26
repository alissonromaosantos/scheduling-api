import type { NextFunction, Request, Response } from "express";

import type { SigninDTO } from "../dto/signin.dto";
import type { SigninService } from "../services/signin.service";

export class SigninController {
  constructor(private readonly signinService: SigninService) {}

  signin = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const data = response.locals.validated.body as SigninDTO;
      const result = await this.signinService.signin(data);

      response.status(200).json({ token: result.token });
    } catch (error) {
      next(error);
    }
  };
}
