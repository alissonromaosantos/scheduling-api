import { AppError } from "../../../shared/errors/app-error";
import type { RemoveContactFromGroupDTO } from "../dto/remove-contact-from-group.dto";
import type { RemoveContactFromGroupRepository } from "../repositories/remove-contact-from-group.repository";

export class RemoveContactFromGroupService {
  constructor(
    private readonly removeContactFromGroupRepository: RemoveContactFromGroupRepository,
  ) {}

  async remove(
    data: RemoveContactFromGroupDTO,
    userId?: string,
  ): Promise<void> {
    const removed = await this.removeContactFromGroupRepository.remove(
      data,
      userId,
    );

    if (!removed) {
      throw new AppError(
        "A associação entre o contato e o grupo não foi encontrada.",
        404,
        "CONTACT_GROUP_NOT_FOUND",
      );
    }
  }
}
