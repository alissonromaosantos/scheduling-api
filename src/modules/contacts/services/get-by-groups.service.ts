import type { GetContactsByGroupsRepository } from "../repositories/get-by-groups.repository";

export class GetContactsByGroupsService {
  constructor(
    private readonly getContactsByGroupsRepository: GetContactsByGroupsRepository,
  ) {}

  async getAll(userId?: string) {
    return this.getContactsByGroupsRepository.getAll(userId);
  }
}
