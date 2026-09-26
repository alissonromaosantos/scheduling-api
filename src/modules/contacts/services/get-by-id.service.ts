import type { UUID } from "node:crypto";
import type { Contact } from "../../../types";
import type { GetContactByIdRepository } from "../repositories/get-by-id.repository";
import { AppError } from "../../../shared/errors/app-error";

export class GetContactByIdService {
  constructor(
    private readonly getContactByIdRepository: GetContactByIdRepository,
  ) {}

  async getById(id: UUID, userId?: string): Promise<Contact> {
    const contact: Contact | null = await this.getContactByIdRepository.getById(
      id,
      userId,
    );

    if (!contact)
      throw new AppError("Contato não encontrado!", 404, "NOT_FOUND");

    return contact;
  }
}
