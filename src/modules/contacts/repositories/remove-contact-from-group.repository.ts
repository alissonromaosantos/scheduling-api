import { and, eq } from "drizzle-orm";
import { db } from "../../../database";
import { contactsGroupsTable } from "../../../database/schema";
import type { RemoveContactFromGroupDTO } from "../dto/remove-contact-from-group.dto";

export class RemoveContactFromGroupRepository {
  async remove(
    data: RemoveContactFromGroupDTO,
    userId?: string,
  ): Promise<boolean> {
    const ownerFilter = userId
      ? eq(contactsGroupsTable.user_id, userId)
      : undefined;
    const deletedAssociations = await db
      .delete(contactsGroupsTable)
      .where(
        and(
          ownerFilter,
          eq(contactsGroupsTable.contact_id, data.contact_id),
          eq(contactsGroupsTable.group_id, data.group_id),
        ),
      )
      .returning({ id: contactsGroupsTable.id });

    return deletedAssociations.length > 0;
  }
}
