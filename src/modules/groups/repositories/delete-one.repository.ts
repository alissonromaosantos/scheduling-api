import { and, eq } from "drizzle-orm";
import { db } from "../../../database";
import { groupsTable } from "../../../database/schema";

export class DeleteOneGroupRepository {
  async deleteOne(id: string, userId?: string): Promise<void> {
    await db
      .delete(groupsTable)
      .where(
        userId
          ? and(eq(groupsTable.id, id), eq(groupsTable.user_id, userId))
          : eq(groupsTable.id, id),
      );
  }
}
