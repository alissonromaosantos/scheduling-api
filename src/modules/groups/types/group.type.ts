import type { groupsTable } from "../../../database/schema";

export type Group = typeof groupsTable.$inferSelect;