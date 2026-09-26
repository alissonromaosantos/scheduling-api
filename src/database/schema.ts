import {
  boolean,
  foreignKey,
  pgEnum,
  pgTable,
  text,
  timestamp,
  unique,
  uuid,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", ["USER", "ADMIN"]);
export type UserRole = (typeof userRoleEnum.enumValues)[number];

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  fullname: text().notNull(),
  email: text().unique().notNull(),
  cpf: text().unique().notNull(),
  phone: text(),
  address: text(),
  password: text().notNull(),
  role: userRoleEnum().notNull().default("USER"),
});

export const contactsTable = pgTable(
  "contacts",
  {
    id: uuid().primaryKey().defaultRandom(),
    user_id: uuid()
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    name: text().notNull(),
    email: text().unique().notNull(),
    phone: text(),
    is_active: boolean().notNull().default(true),
    observations: text(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique("contacts_id_user_id_unique").on(table.id, table.user_id)],
);

export const groupsTable = pgTable(
  "groups",
  {
    id: uuid().primaryKey().defaultRandom(),
    user_id: uuid()
      .notNull()
      .references(() => usersTable.id, {
        onDelete: "cascade",
      }),
    name: text().notNull(),
    created_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
    updated_at: timestamp({ withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [unique("groups_id_user_id_unique").on(table.id, table.user_id)],
);

export const contactsGroupsTable = pgTable(
  "contacts_groups",
  {
    id: uuid().primaryKey().defaultRandom(),
    user_id: uuid().notNull(),
    contact_id: uuid().notNull(),
    group_id: uuid().notNull(),
  },
  (table) => [
    foreignKey({
      name: "contacts_groups_user_id_users_id_fk",
      columns: [table.user_id],
      foreignColumns: [usersTable.id],
    }).onDelete("cascade"),
    foreignKey({
      name: "contacts_groups_contact_tenant_fk",
      columns: [table.contact_id, table.user_id],
      foreignColumns: [contactsTable.id, contactsTable.user_id],
    }).onDelete("cascade"),
    foreignKey({
      name: "contacts_groups_group_tenant_fk",
      columns: [table.group_id, table.user_id],
      foreignColumns: [groupsTable.id, groupsTable.user_id],
    }).onDelete("cascade"),
  ],
);
