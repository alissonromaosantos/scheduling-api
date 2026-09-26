import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { groupsTable } from "../../../database/schema";

export class GetAllGroupsRepository {
  async getAll(
    userId?: string,
  ): Promise<InferSelectModel<typeof groupsTable>[]> {
    const query = db.select().from(groupsTable);
    return userId ? query.where(eq(groupsTable.user_id, userId)) : query;
  }
}
