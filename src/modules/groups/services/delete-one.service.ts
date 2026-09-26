import type { UUID } from "crypto";
import type { DeleteOneGroupRepository } from "../repositories/delete-one.repository";

export class DeleteOneGroupService {
  constructor(
    private readonly deleteOneGroupRepository: DeleteOneGroupRepository,
  ) {}

  async deleteOne(id: UUID, userId?: string) {
    await this.deleteOneGroupRepository.deleteOne(id, userId);
  }
}
