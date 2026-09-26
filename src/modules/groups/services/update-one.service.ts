import type { Group } from "../../../types";
import { AppError } from "../../../shared/errors/app-error";
import type { UUID } from "crypto";
import type { UpdateOneGroupRepository } from "../repositories/update-one.repository";
import type { UpdateGroupDTO } from "../dto/update-group.dto";

export class UpdateOneGroupService {
  constructor(
    private readonly updateOneGroupRepository: UpdateOneGroupRepository,
  ) {}

  async updateOne(
    id: UUID,
    data: UpdateGroupDTO,
    userId?: string,
  ): Promise<void> {
    if (!data || Object.keys(data).length === 0) {
      throw new AppError(
        "Para atualizar um grupo é necessário informar o novo nome do grupo!",
        400,
        "BAD_REQUEST",
      );
    }

    const group: Group | null = await this.updateOneGroupRepository.updateOne(
      id,
      data,
      userId,
    );

    if (!group) {
      throw new AppError("Grupo não encontrado!", 404, "NOT_FOUND");
    }
  }
}
