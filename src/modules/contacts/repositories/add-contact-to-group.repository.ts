import { and, eq } from "drizzle-orm";
import { db } from "../../../database";
import {
  contactsGroupsTable,
  contactsTable,
  groupsTable,
} from "../../../database/schema";
import type { AddContactToGroupDTO } from "../dto/add-contact-to-group.dto";

type AddContactToGroupData = AddContactToGroupDTO & { user_id: string };

export class AddContactToGroupRepository {
  async contactExists(contactId: string, userId: string): Promise<boolean> {
    const [contact] = await db
      .select({ id: contactsTable.id })
      .from(contactsTable)
      .where(and(eq(contactsTable.id, contactId), eq(contactsTable.user_id, userId)))
      .limit(1);
    return Boolean(contact);
  }

  async groupExists(groupId: string, userId: string): Promise<boolean> {
    const [group] = await db
      .select({ id: groupsTable.id })
      .from(groupsTable)
      .where(and(eq(groupsTable.id, groupId), eq(groupsTable.user_id, userId)))
      .limit(1);
    return Boolean(group);
  }

  async associationExists(data: AddContactToGroupDTO, userId: string): Promise<boolean> {
    const [association] = await db
      .select({ id: contactsGroupsTable.id })
      .from(contactsGroupsTable)
      .where(
        and(
          eq(contactsGroupsTable.user_id, userId),
          eq(contactsGroupsTable.contact_id, data.contact_id),
          eq(contactsGroupsTable.group_id, data.group_id),
        ),
      )
      .limit(1);
    return Boolean(association);
  }

  async add(data: AddContactToGroupData): Promise<void> {
    await db.insert(contactsGroupsTable).values({
      user_id: data.user_id,
      contact_id: data.contact_id,
      group_id: data.group_id,
    });
  }
}
