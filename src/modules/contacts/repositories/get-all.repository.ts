import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { contactsTable } from "../../../database/schema";

export class GetAllContactsRepository {
  async getAll(
    userId?: string,
  ): Promise<InferSelectModel<typeof contactsTable>[]> {
    const query = db.select().from(contactsTable);
    return userId ? query.where(eq(contactsTable.user_id, userId)) : query;
  }
}
