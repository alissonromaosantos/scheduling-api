import bcrypt from "bcryptjs";
import { AppError } from "../../../shared/errors/app-error";
import type { CreateUserDTO } from "../dto/create-user.dto";
import type {
  UpdateAdminUserDTO,
  UpdateOwnUserDTO,
} from "../dto/update-user.dto";
import {
  UsersRepository,
  type PublicUser,
} from "../repositories/users.repository";

const BCRYPT_ROUNDS = 13;

export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAll(): Promise<PublicUser[]> {
    return this.usersRepository.getAll();
  }

  async getById(id: string): Promise<PublicUser> {
    const user = await this.usersRepository.getById(id);
    if (!user) throw new AppError("Usuário não encontrado!", 404, "NOT_FOUND");
    return user;
  }

  async create(data: CreateUserDTO): Promise<PublicUser> {
    const password = await bcrypt.hash(data.password, BCRYPT_ROUNDS);
    try {
      return await this.usersRepository.create({ ...data, password });
    } catch (error) {
      this.mapUserWriteError(error);
      throw error;
    }
  }

  async getOwn(userId: string): Promise<PublicUser> {
    return this.getById(userId);
  }

  async updateOwn(userId: string, data: UpdateOwnUserDTO): Promise<PublicUser> {
    const updateData = await this.hashPassword(data);
    try {
      const user = await this.usersRepository.updateOwn(userId, updateData);
      if (!user)
        throw new AppError("Usuário não encontrado!", 404, "NOT_FOUND");
      return user;
    } catch (error) {
      this.mapUserWriteError(error);
      throw error;
    }
  }

  async updateByAdmin(
    id: string,
    data: UpdateAdminUserDTO,
  ): Promise<PublicUser> {
    let result;
    try {
      result = await this.usersRepository.updateByAdmin(
        id,
        await this.hashPassword(data),
      );
    } catch (error) {
      this.mapUserWriteError(error);
      throw error;
    }
    if (result.kind === "not-found") {
      throw new AppError("Usuário não encontrado!", 404, "NOT_FOUND");
    }
    if (result.kind === "last-admin") {
      throw new AppError(
        "Não é possível rebaixar o último administrador.",
        409,
        "LAST_ADMIN",
      );
    }
    return result.user;
  }

  async delete(id: string): Promise<void> {
    const result = await this.usersRepository.deleteById(id);
    if (result === "not-found") {
      throw new AppError("Usuário não encontrado!", 404, "NOT_FOUND");
    }
    if (result === "last-admin") {
      throw new AppError(
        "Não é possível excluir o último administrador.",
        409,
        "LAST_ADMIN",
      );
    }
  }

  private async hashPassword<T extends { password?: string | undefined }>(
    data: T,
  ): Promise<Omit<T, "password"> & { password?: string }> {
    const { password, ...fields } = data;
    return password
      ? { ...fields, password: await bcrypt.hash(password, BCRYPT_ROUNDS) }
      : fields;
  }

  private mapUserWriteError(error: unknown): void {
    if (isUniqueConstraintViolation(error)) {
      throw new AppError("E-mail ou CPF já cadastrado!", 409, "CONFLICT");
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
