import { eq } from "drizzle-orm";

import { db } from "../../../../database";
import { usersTable } from "../../../../database/schema";

export class FindUserByCpfRepository {
  async findByCpf(cpf: string): Promise<boolean> {
    const [user] = await db
      .select({ id: usersTable.id })
      .from(usersTable)
      .where(eq(usersTable.cpf, cpf))
      .limit(1);

    return Boolean(user);
  }
}
