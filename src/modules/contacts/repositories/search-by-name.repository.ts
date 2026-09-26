import { and, eq, ilike, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { contactsTable } from "../../../database/schema";

export class SearchContactByNameRepository {
  async searchByName(
    name: string,
    userId: string,
  ): Promise<InferSelectModel<typeof contactsTable>[]> {
    return await db
      .select()
      .from(contactsTable)
      .where(and(ilike(contactsTable.name, `%${name}%`), eq(contactsTable.user_id, userId)));
  }
}