import { SigninController } from "../controllers/signin.controller";
import { FindUserByEmailRepository } from "../repositories/find-user-by-email.repository";
import { SigninService } from "../services/signin.service";

const findUserByEmailRepository = new FindUserByEmailRepository();
const signinService = new SigninService(findUserByEmailRepository);

export const signinController = new SigninController(signinService);
