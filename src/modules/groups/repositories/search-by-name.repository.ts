import { and, eq, ilike, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { groupsTable } from "../../../database/schema";

export class SearchGroupByNameRepository {
  async searchByName(
    name: string,
    userId: string,
  ): Promise<InferSelectModel<typeof groupsTable>[]> {
    return await db
      .select()
      .from(groupsTable)
      .where(and(ilike(groupsTable.name, `%${name}%`), eq(groupsTable.user_id, userId)));
  }
}
