import { eq, type InferSelectModel } from "drizzle-orm";

import { db } from "../../../../database";
import { usersTable } from "../../../../database/schema";

export class FindUserByEmailRepository {
  async findByEmail(
    email: string,
  ): Promise<InferSelectModel<typeof usersTable> | null> {
    const [user] = await db
      .select()
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return user ?? null;
  }
}
