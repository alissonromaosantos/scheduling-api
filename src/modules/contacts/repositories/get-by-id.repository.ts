import { and, eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { contactsTable } from "../../../database/schema";

export class GetContactByIdRepository {
  async getById(
    id: string,
    userId?: string,
  ): Promise<InferSelectModel<typeof contactsTable> | null> {
    const [contact] = await db
      .select()
      .from(contactsTable)
      .where(
        userId
          ? and(eq(contactsTable.id, id), eq(contactsTable.user_id, userId))
          : eq(contactsTable.id, id),
      )
      .limit(1);
    return contact || null;
  }
}
