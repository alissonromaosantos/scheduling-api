import type { Contact } from "../../../types";
import { AppError } from "../../../shared/errors/app-error";
import type { CreateOneContactRepository } from "../repositories/create-one.repository";
import type { CreateContactDTO } from "../dto/create-contact.dto";
import type { SearchContactByEmailRepository } from "../repositories/search-by-email.repository";


export class CreateOneContactService {
  constructor(
    private readonly createOneContactRepository: CreateOneContactRepository,
    private readonly searchContactByEmailRepository: SearchContactByEmailRepository,
  ) {}

  async createOne(data: CreateContactDTO, userId: string): Promise<void> {
    if (!data) {
      throw new AppError("Os campos nome e email são obrigatórios", 400, "BAD_REQUEST");
    }

    if (!data.name) {
      throw new AppError("O campo nome é obrigatório", 400, "BAD_REQUEST");
    }

    if (!data.email) {
      throw new AppError("O campo e-mail é obrigatório", 400, "BAD_REQUEST");
    }

    const contact: Contact | null =
      await this.searchContactByEmailRepository.searchByEmail(data.email);

    if (contact) {
      if (contact.user_id !== userId) {
        throw new AppError("Contato já está cadastrado para outro usuário!", 409, "CONFLICT");
      }

      throw new AppError("Contato já está cadastrado!", 409, "CONFLICT");
    }

    await this.createOneContactRepository.createOne({ ...data, user_id: userId });
  }
}