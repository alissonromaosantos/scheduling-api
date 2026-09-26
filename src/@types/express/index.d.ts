import type { UserRole } from "../../database/schema";

declare global {
  namespace Express {
    interface Request {
      id?: string;
      user?: {
        id: string;
        email: string;
        role: UserRole;
      };
    }
  }
}

export {};
