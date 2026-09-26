import { Request, Response, NextFunction } from "express";
import type { DeleteOneContactService } from "../services/delete-one.service";
import type { UUID } from "crypto";

export class DeleteOneContactController {
  constructor(
    private readonly deleteOneContactService: DeleteOneContactService,
  ) {}

  deleteOne = async (
    request: Request,
    response: Response,
    next: NextFunction,
  ) => {
    try {
      const id = request.params.id as UUID;

      await this.deleteOneContactService.deleteOne(id, request.user!.id);

      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
