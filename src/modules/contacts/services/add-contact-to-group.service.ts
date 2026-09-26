import { AppError } from "../../../shared/errors/app-error";
import type { AddContactToGroupDTO } from "../dto/add-contact-to-group.dto";
import type { AddContactToGroupRepository } from "../repositories/add-contact-to-group.repository";

export class AddContactToGroupService {
  constructor(
    private readonly addContactToGroupRepository: AddContactToGroupRepository,
  ) {}

  async add(data: AddContactToGroupDTO, userId: string): Promise<void> {
    if (!(await this.addContactToGroupRepository.contactExists(data.contact_id, userId))) {
      throw new AppError("Contato não encontrado.", 404, "CONTACT_NOT_FOUND");
    }

    if (!(await this.addContactToGroupRepository.groupExists(data.group_id, userId))) {
      throw new AppError("Grupo não encontrado.", 404, "GROUP_NOT_FOUND");
    }

    if (await this.addContactToGroupRepository.associationExists(data, userId)) {
      throw new AppError(
        "Este contato já está associado a esse grupo.",
        409,
        "CONTACT_ALREADY_IN_GROUP",
      );
    }

    await this.addContactToGroupRepository.add({ ...data, user_id: userId });
  }
}
