import type { GetAllGroupsRepository } from "../repositories/get-all.repository";

export class GetAllGroupsService {
  constructor(
    private readonly getAllGroupsRepository: GetAllGroupsRepository,
  ) {}

  async getAll(userId?: string) {
    const groups = await this.getAllGroupsRepository.getAll(userId);

    return groups;
  }
}
