import type { Contact } from "../../../types";
import { AppError } from "../../../shared/errors/app-error";
import type { UpdateOneContactRepository } from "../repositories/update-one.repository";
import type { UUID } from "crypto";
import type { SearchContactByEmailRepository } from "../repositories/search-by-email.repository";
import type { UpdateContactDTO } from "../dto/update-contact.dto";

export class UpdateOneContactService {
  constructor(
    private readonly updateOneContactRepository: UpdateOneContactRepository,
    private readonly searchContactByEmailRepository: SearchContactByEmailRepository,
  ) {}

  async updateOne(
    id: UUID,
    data: UpdateContactDTO,
    userId?: string,
  ): Promise<void> {
    if (!data || Object.keys(data).length === 0) {
      throw new AppError(
        "Para atualizar um contato é necessário informar pelo menos o nome, e-mail, telefone, se está ativo ou observações!",
        400,
        "BAD_REQUEST",
      );
    }

    if (data.email) {
      const contactAlreadyExists =
        await this.searchContactByEmailRepository.searchByEmail(data.email);

      if (contactAlreadyExists && contactAlreadyExists.id !== id) {
        throw new AppError("Tente com outro e-mail!", 409, "CONFLICT");
      }
    }

    const contact: Contact | null =
      await this.updateOneContactRepository.updateOne(id, data, userId);

    if (!contact) {
      throw new AppError("Contato não encontrado!", 404, "NOT_FOUND");
    }
  }
}
