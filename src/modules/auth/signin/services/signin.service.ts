import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";

import { env } from "../../../../config/env";
import { AppError } from "../../../../shared/errors/app-error";
import type { SigninDTO } from "../dto/signin.dto";
import type { FindUserByEmailRepository } from "../repositories/find-user-by-email.repository";

export class SigninService {
  constructor(
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
  ) {}

  async signin(data: SigninDTO): Promise<{ token: string }> {
    const user = await this.findUserByEmailRepository.findByEmail(data.email);

    if (!user) {
      throw new AppError("Credenciais inválidas!", 401, "UNAUTHORIZED");
    }

    const passwordMatches = await bcrypt.compare(data.password, user.password);

    if (!passwordMatches) {
      throw new AppError("Credenciais inválidas!", 401, "UNAUTHORIZED");
    }

    const token = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      env.JWT_SECRET,
      {
        expiresIn: env.JWT_EXPIRES_IN as SignOptions["expiresIn"],
      },
    );

    return { token };
  }
}
