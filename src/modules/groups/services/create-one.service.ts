import { AppError } from "../../../shared/errors/app-error";
import type { CreateOneGroupRepository } from "../repositories/create-one.repository";
import type { CreateGroupDTO } from "../dto/create-group.dto";

export class CreateOneGroupService {
  constructor(
    private readonly createOneGroupRepository: CreateOneGroupRepository,
  ) {}

  async createOne(data: CreateGroupDTO, userId: string): Promise<void> {
    if (!data) {
      throw new AppError(
        "O campo nome do grupo é obrigatório",
        400,
        "BAD_REQUEST",
      );
    }

    if (!data.name) {
      throw new AppError("O campo nome é obrigatório", 400, "BAD_REQUEST");
    }

    await this.createOneGroupRepository.createOne({ ...data, user_id: userId });
  }
}
