import { eq, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { contactsTable } from "../../../database/schema";

export class SearchContactByEmailRepository {
  async searchByEmail(email: string): Promise<InferSelectModel<typeof contactsTable> | null> {
    const [contact] = await db
      .select()
      .from(contactsTable)
      .where(eq(contactsTable.email, email))
      .limit(1);
    return contact || null;
  }
}