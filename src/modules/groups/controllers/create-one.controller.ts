import { Request, Response, NextFunction } from "express";
import type { CreateOneGroupService } from "../services/create-one.service";

export class CreateOneGroupController {
  constructor(private readonly createOneGroupService: CreateOneGroupService) {}

  createOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = request.body;
      await this.createOneGroupService.createOne(data, request.user!.id);

      return response.status(200).json({ message: "Grupo cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}
