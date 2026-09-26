import { Request, Response, NextFunction } from "express";
import type { CreateOneContactService } from "../services/create-one.service";

export class CreateOneContactController {
  constructor(private readonly createOneContactService: CreateOneContactService) {}

  createOne = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const data = request.body;
      await this.createOneContactService.createOne(data, request.user!.id);

      return response.status(200).json({ message: "Contato cadastrado com sucesso!" });
    } catch (error) {
      next(error);
    }
  };
}