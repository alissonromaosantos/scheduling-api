import type { UUID } from "node:crypto";
import type { Group } from "../../../types";
import { AppError } from "../../../shared/errors/app-error";
import type { GetGroupByIdRepository } from "../repositories/get-by-id.repository";

export class GetGroupByIdService {
  constructor(
    private readonly getGroupByIdRepository: GetGroupByIdRepository,
  ) {}

  async getById(id: UUID, userId?: string): Promise<Group> {
    const group: Group | null = await this.getGroupByIdRepository.getById(
      id,
      userId,
    );

    if (!group) throw new AppError("Grupo não encontrado!", 404, "NOT_FOUND");

    return group;
  }
}
