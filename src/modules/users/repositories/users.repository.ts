import { asc, eq, sql, type InferSelectModel } from "drizzle-orm";
import { db } from "../../../database";
import { usersTable } from "../../../database/schema";
import type { CreateUserDTO } from "../dto/create-user.dto";
import type {
  UpdateAdminUserDTO,
  UpdateOwnUserDTO,
} from "../dto/update-user.dto";

const publicUserColumns = {
  id: usersTable.id,
  fullname: usersTable.fullname,
  email: usersTable.email,
  cpf: usersTable.cpf,
  phone: usersTable.phone,
  address: usersTable.address,
  role: usersTable.role,
};

export type PublicUser = Pick<
  InferSelectModel<typeof usersTable>,
  "id" | "fullname" | "email" | "cpf" | "phone" | "address" | "role"
>;
export type AdminUserMutationResult =
  | { kind: "updated"; user: PublicUser }
  | { kind: "not-found" }
  | { kind: "last-admin" };
export type AdminDeleteResult = "deleted" | "not-found" | "last-admin";

type CreateUserData = Omit<CreateUserDTO, "password"> & {
  password: string;
};
type UpdateOwnUserData = Omit<UpdateOwnUserDTO, "password"> & {
  password?: string;
};
type UpdateAdminUserData = Omit<UpdateAdminUserDTO, "password"> & {
  password?: string;
};

const ADMIN_ROLE_LOCK_ID = 4260926;

export class UsersRepository {
  async getAll(): Promise<PublicUser[]> {
    return db
      .select(publicUserColumns)
      .from(usersTable)
      .orderBy(asc(usersTable.fullname));
  }

  async getById(id: string): Promise<PublicUser | null> {
    const [user] = await db
      .select(publicUserColumns)
      .from(usersTable)
      .where(eq(usersTable.id, id))
      .limit(1);
    return user ?? null;
  }

  async create(data: CreateUserData): Promise<PublicUser> {
    return db.transaction(async (transaction) => {
      if (data.role === "ADMIN") {
        await transaction.execute(
          sql`SELECT pg_advisory_xact_lock(${ADMIN_ROLE_LOCK_ID})`,
        );
      }
      const [user] = await transaction
        .insert(usersTable)
        .values(data)
        .returning(publicUserColumns);
      return user;
    });
  }

  async updateOwn(
    id: string,
    data: UpdateOwnUserData,
  ): Promise<PublicUser | null> {
    const [user] = await db
      .update(usersTable)
      .set(data)
      .where(eq(usersTable.id, id))
      .returning(publicUserColumns);
    return user ?? null;
  }

  async updateByAdmin(
    id: string,
    data: UpdateAdminUserData,
  ): Promise<AdminUserMutationResult> {
    return db.transaction(async (transaction) => {
      await transaction.execute(
        sql`SELECT pg_advisory_xact_lock(${ADMIN_ROLE_LOCK_ID})`,
      );
      const [currentUser] = await transaction
        .select({ role: usersTable.role })
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .for("update");

      if (!currentUser) return { kind: "not-found" };

      if (currentUser.role === "ADMIN" && data.role === "USER") {
        const admins = await transaction
          .select({ id: usersTable.id })
          .from(usersTable)
          .where(eq(usersTable.role, "ADMIN"));
        if (admins.length <= 1) return { kind: "last-admin" };
      }

      const [user] = await transaction
        .update(usersTable)
        .set(data)
        .where(eq(usersTable.id, id))
        .returning(publicUserColumns);

      return user ? { kind: "updated", user } : { kind: "not-found" };
    });
  }

  async deleteById(id: string): Promise<AdminDeleteResult> {
    return db.transaction(async (transaction) => {
      await transaction.execute(
        sql`SELECT pg_advisory_xact_lock(${ADMIN_ROLE_LOCK_ID})`,
      );
      const [currentUser] = await transaction
        .select({ role: usersTable.role })
        .from(usersTable)
        .where(eq(usersTable.id, id))
        .for("update");

      if (!currentUser) return "not-found";

      if (currentUser.role === "ADMIN") {
        const admins = await transaction
          .select({ id: usersTable.id })
          .from(usersTable)
          .where(eq(usersTable.role, "ADMIN"));
        if (admins.length <= 1) return "last-admin";
      }

      await transaction.delete(usersTable).where(eq(usersTable.id, id));
      return "deleted";
    });
  }
}
