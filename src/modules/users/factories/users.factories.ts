import { UsersController } from "../controllers/users.controller";
import { UsersRepository } from "../repositories/users.repository";
import { UsersService } from "../services/users.service";

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);

export const usersController = new UsersController(usersService);
