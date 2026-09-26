import { db } from "../../../database";
import { contactsTable } from "../../../database/schema";
import type { CreateContactDTO } from "../dto/create-contact.dto";

type CreateContactData = CreateContactDTO & { user_id: string };

export class CreateOneContactRepository {
  async createOne(data: CreateContactData): Promise<void> {
    await db.insert(contactsTable).values(data);
  }
}