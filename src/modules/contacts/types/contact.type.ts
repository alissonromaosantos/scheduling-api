import type { contactsTable } from "../../../database/schema";

export type Contact = typeof contactsTable.$inferSelect;