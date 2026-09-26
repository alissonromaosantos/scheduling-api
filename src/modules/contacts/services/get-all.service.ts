import { GetAllContactsRepository } from "../repositories/get-all.repository";
export class GetAllContactsService {
  constructor(
    private readonly getAllContactsRepository: GetAllContactsRepository,
  ) {}

  async getAll(userId?: string) {
    const contacts = await this.getAllContactsRepository.getAll(userId);

    return contacts;
  }
}
