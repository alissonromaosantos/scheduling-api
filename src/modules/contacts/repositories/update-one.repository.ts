import { and, eq, sql, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { contactsTable } from "../../../database/schema";
import type { UpdateContactDTO } from "../dto/update-contact.dto";

export class UpdateOneContactRepository {
  async updateOne(
    id: string,
    data: UpdateContactDTO,
    userId?: string,
  ): Promise<InferSelectModel<typeof contactsTable> | null> {
    const [updatedContact] = await db
      .update(contactsTable)
      .set({ ...data, updated_at: sql`now()` })
      .where(
        userId
          ? and(eq(contactsTable.id, id), eq(contactsTable.user_id, userId))
          : eq(contactsTable.id, id),
      )
      .returning();

    return updatedContact || null;
  }
}
