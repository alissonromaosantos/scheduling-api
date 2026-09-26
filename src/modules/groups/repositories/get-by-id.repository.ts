import { and, eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { groupsTable } from "../../../database/schema";

export class GetGroupByIdRepository {
  async getById(
    id: string,
    userId?: string,
  ): Promise<InferSelectModel<typeof groupsTable> | null> {
    const [group] = await db
      .select()
      .from(groupsTable)
      .where(
        userId
          ? and(eq(groupsTable.id, id), eq(groupsTable.user_id, userId))
          : eq(groupsTable.id, id),
      )
      .limit(1);
    return group || null;
  }
}
