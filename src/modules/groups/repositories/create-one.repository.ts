import { db } from "../../../database";
import { groupsTable } from "../../../database/schema";
import type { CreateGroupDTO } from "../dto/create-group.dto";

type CreateGroupData = CreateGroupDTO & { user_id: string };

export class CreateOneGroupRepository {
  async createOne(data: CreateGroupData): Promise<void> {
    await db.insert(groupsTable).values(data);
  }
}
