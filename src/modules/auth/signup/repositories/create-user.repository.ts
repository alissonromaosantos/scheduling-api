import { db } from "../../../../database";
import { usersTable } from "../../../../database/schema";
import type { SignupDTO } from "../dto/signup.dto";

type CreateUserData = Omit<SignupDTO, "password"> & { password: string };

export class CreateUserRepository {
  async create(data: CreateUserData): Promise<void> {
    await db.insert(usersTable).values(data);
  }
}
