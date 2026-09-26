import { SignupController } from "../controllers/signup.controller";
import { CreateUserRepository } from "../repositories/create-user.repository";
import { FindUserByCpfRepository } from "../repositories/find-user-by-cpf.repository";
import { FindUserByEmailRepository } from "../repositories/find-user-by-email.repository";
import { SignupService } from "../services/signup.service";

const createUserRepository = new CreateUserRepository();
const findUserByEmailRepository = new FindUserByEmailRepository();
const findUserByCpfRepository = new FindUserByCpfRepository();

const signupService = new SignupService(
  createUserRepository,
  findUserByEmailRepository,
  findUserByCpfRepository,
);

export const signupController = new SignupController(signupService);
