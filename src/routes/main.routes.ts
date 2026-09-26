import { Router } from "express";
import { SigninRoutes } from "../modules/auth/signin/routes/signin.routes";
import { SignupRoutes } from "../modules/auth/signup/routes/signup.routes";
import { ContactRoutes } from "../modules/contacts/routes/contact.routes";
import { GroupRoutes } from "../modules/groups/routes/group.routes";
import { UsersRoutes } from "../modules/users/routes/users.routes";

export class MainRoutes {
  private readonly router: Router;

  constructor() {
    this.router = Router();
  }

  init() {
    const signinRoutes = new SigninRoutes();
    const signupRoutes = new SignupRoutes();
    const contactRoutes = new ContactRoutes();
    const groupRoutes = new GroupRoutes();
    const usersRoutes = new UsersRoutes();

    this.router.use(signinRoutes.init());
    this.router.use(signupRoutes.init());
    this.router.use(contactRoutes.init());
    this.router.use(groupRoutes.init());
    this.router.use(usersRoutes.init());

    return this.router;
  }
}
