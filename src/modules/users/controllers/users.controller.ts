import type { NextFunction, Request, Response } from "express";
import type { CreateUserDTO } from "../dto/create-user.dto";
import type {
  UpdateAdminUserDTO,
  UpdateOwnUserDTO,
} from "../dto/update-user.dto";
import type { UsersService } from "../services/users.service";

export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  getAll = async (
    _request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      response.status(200).json({ users: await this.usersService.getAll() });
    } catch (error) {
      next(error);
    }
  };

  getById = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      response
        .status(200)
        .json(await this.usersService.getById(request.params.id as string));
    } catch (error) {
      next(error);
    }
  };

  create = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = response.locals.validated.body as CreateUserDTO;
      const user = await this.usersService.create(data);
      response.status(201).json(user);
    } catch (error) {
      next(error);
    }
  };

  getOwn = async (request: Request, response: Response, next: NextFunction) => {
    try {
      response
        .status(200)
        .json(await this.usersService.getOwn(request.user!.id));
    } catch (error) {
      next(error);
    }
  };

  updateOwn = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const data = response.locals.validated.body as UpdateOwnUserDTO;
      response
        .status(200)
        .json(await this.usersService.updateOwn(request.user!.id, data));
    } catch (error) {
      next(error);
    }
  };

  updateByAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const data = response.locals.validated.body as UpdateAdminUserDTO;
      response
        .status(200)
        .json(
          await this.usersService.updateByAdmin(
            request.params.id as string,
            data,
          ),
        );
    } catch (error) {
      next(error);
    }
  };

  deleteOwn = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      await this.usersService.delete(request.user!.id);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };

  deleteByAdmin = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      await this.usersService.delete(request.params.id as string);
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
