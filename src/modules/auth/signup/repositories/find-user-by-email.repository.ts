import { eq } from "drizzle-orm";

import { db } from "../../../../database";
import { usersTable } from "../../../../database/schema";

export class FindUserByEmailRepository {
  async findByEmail(email: string): Promise<boolean> {
    const [user] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.email, email))
      .limit(1);

    return Boolean(user);
  }
}
