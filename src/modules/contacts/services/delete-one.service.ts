import type { UUID } from "crypto";
import type { DeleteOneContactRepository } from "../repositories/delete-one.repository";

export class DeleteOneContactService {
  constructor(
    private readonly deleteOneContactRepository: DeleteOneContactRepository,
  ) {}

  async deleteOne(id: UUID, userId?: string) {
    await this.deleteOneContactRepository.deleteOne(id, userId);
  }
}
