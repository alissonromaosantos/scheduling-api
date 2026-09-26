import bcrypt from "bcryptjs";

import { AppError } from "../../../../shared/errors/app-error";
import type { SignupDTO } from "../dto/signup.dto";
import type { CreateUserRepository } from "../repositories/create-user.repository";
import type { FindUserByCpfRepository } from "../repositories/find-user-by-cpf.repository";
import type { FindUserByEmailRepository } from "../repositories/find-user-by-email.repository";

const BCRYPT_ROUNDS = 13;

export class SignupService {
  constructor(
    private readonly createUserRepository: CreateUserRepository,
    private readonly findUserByEmailRepository: FindUserByEmailRepository,
    private readonly findUserByCpfRepository: FindUserByCpfRepository,
  ) {}

  async signup(data: SignupDTO): Promise<void> {
    if (await this.findUserByEmailRepository.findByEmail(data.email)) {
      throw new AppError("E-mail já cadastrado!", 409, "CONFLICT");
    }

    if (await this.findUserByCpfRepository.findByCpf(data.cpf)) {
      throw new AppError("CPF já cadastrado!", 409, "CONFLICT");
    }

    const password = await bcrypt.hash(data.password, BCRYPT_ROUNDS);

    try {
      await this.createUserRepository.create({ ...data, password });
    } catch (error) {
      if (isUniqueConstraintViolation(error)) {
        throw new AppError("E-mail ou CPF já cadastrado!", 409, "CONFLICT");
      }

      throw error;
    }
  }
}

const isUniqueConstraintViolation = (
  error: unknown,
): error is { code: string } =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  error.code === "23505";
