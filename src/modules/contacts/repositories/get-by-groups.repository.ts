import { and, asc, eq } from "drizzle-orm";
import { db } from "../../../database";
import {
  contactsGroupsTable,
  contactsTable,
  groupsTable,
} from "../../../database/schema";
import type { ContactByGroup } from "../types/contact-by-group.type";

type ContactGroupRow = {
  id: string;
  user_id: string;
  name: string;
  email: string;
  phone: string | null;
  is_active: boolean;
  observations: string | null;
  group_id: string;
  group_name: string;
  contacts_groups_id: string;
};

export class GetContactsByGroupsRepository {
  async getAll(userId?: string): Promise<ContactByGroup[]> {
    const query = db
      .select({
        id: contactsTable.id,
        user_id: contactsTable.user_id,
        name: contactsTable.name,
        email: contactsTable.email,
        phone: contactsTable.phone,
        is_active: contactsTable.is_active,
        observations: contactsTable.observations,
        group_id: groupsTable.id,
        group_name: groupsTable.name,
        contacts_groups_id: contactsGroupsTable.id,
      })
      .from(contactsGroupsTable)
      .innerJoin(
        contactsTable,
        and(
          eq(contactsGroupsTable.contact_id, contactsTable.id),
          eq(contactsGroupsTable.user_id, contactsTable.user_id),
        ),
      )
      .innerJoin(
        groupsTable,
        and(
          eq(contactsGroupsTable.group_id, groupsTable.id),
          eq(contactsGroupsTable.user_id, groupsTable.user_id),
        ),
      );
    const scopedQuery = userId
      ? query.where(
          and(
            eq(contactsGroupsTable.user_id, userId),
            eq(contactsTable.user_id, userId),
            eq(groupsTable.user_id, userId),
          ),
        )
      : query;
    const rows: ContactGroupRow[] = await scopedQuery.orderBy(
      asc(contactsTable.name),
      asc(groupsTable.name),
    );

    const contactsById = new Map<string, ContactByGroup>();

    for (const row of rows) {
      let contact = contactsById.get(row.id);

      if (!contact) {
        contact = {
          id: row.id,
          user_id: row.user_id,
          name: row.name,
          email: row.email,
          phone: row.phone,
          is_active: row.is_active,
          observations: row.observations,
          groups: [],
        };
        contactsById.set(row.id, contact);
      }

      contact.groups.push({
        id: row.group_id,
        name: row.group_name,
        contacts_groups_id: row.contacts_groups_id,
      });
    }

    return Array.from(contactsById.values());
  }
}
