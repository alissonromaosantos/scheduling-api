import { and, eq, sql, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { groupsTable } from "../../../database/schema";
import type { UpdateGroupDTO } from "../dto/update-group.dto";

export class UpdateOneGroupRepository {
  async updateOne(
    id: string,
    data: UpdateGroupDTO,
    userId?: string,
  ): Promise<InferSelectModel<typeof groupsTable> | null> {
    const [updatedGroup] = await db
      .update(groupsTable)
      .set({ ...data, updated_at: sql`now()` })
      .where(
        userId
          ? and(eq(groupsTable.id, id), eq(groupsTable.user_id, userId))
          : eq(groupsTable.id, id),
      )
      .returning();

    return updatedGroup || null;
  }
}
