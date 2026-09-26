import type { Group } from "../../../types";
import { AppError } from "../../../shared/errors/app-error";
import type { SearchGroupByNameRepository } from "../repositories/search-by-name.repository";

export class SearchGroupByNameService {
  constructor(private readonly searchGroupByNameRepository: SearchGroupByNameRepository) {}

  async searchByName(name: string, userId: string): Promise<Group[]> {
    if (!name) throw new AppError("O nome não foi passado como parâmetro na URL", 400, "BAD_REQUEST");

    const groups: Group[] | [] =
      await this.searchGroupByNameRepository.searchByName(name, userId);
  
    if (!groups || groups.length === 0)
      throw new AppError("Grupo não encontrado!", 404, "NOT_FOUND");

    return groups;
  }
}
