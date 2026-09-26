import type { Contact } from "../../../types";
import { AppError } from "../../../shared/errors/app-error";
import type { SearchContactByNameRepository } from "../repositories/search-by-name.repository";

export class SearchContactByNameService {
  constructor(private readonly searchContactByNameRepository: SearchContactByNameRepository) {}

  async searchByName(name: string, userId: string): Promise<Contact[]> {
    if (!name) throw new AppError("O nome não foi passado como parâmetro na URL", 400, "BAD_REQUEST");

    const contacts: Contact[] | [] =
      await this.searchContactByNameRepository.searchByName(name, userId);
  
    if (!contacts || contacts.length === 0) throw new AppError("Contato não encontrado!", 404, "NOT_FOUND");

    return contacts;
  }
}