import { and, eq } from "drizzle-orm";
import { db } from "../../../database";
import { contactsTable } from "../../../database/schema";

export class DeleteOneContactRepository {
  async deleteOne(id: string, userId?: string): Promise<void> {
    await db
      .delete(contactsTable)
      .where(
        userId
          ? and(eq(contactsTable.id, id), eq(contactsTable.user_id, userId))
          : eq(contactsTable.id, id),
      );
  }
}
