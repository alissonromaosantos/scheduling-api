import type { NextFunction, Request, Response } from "express";
import type { RemoveContactFromGroupService } from "../services/remove-contact-from-group.service";
import type { RemoveContactFromGroupDTO } from "../dto/remove-contact-from-group.dto";

export class RemoveContactFromGroupController {
  constructor(
    private readonly removeContactFromGroupService: RemoveContactFromGroupService,
  ) {}

  remove = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const params = response.locals.validated
        .params as RemoveContactFromGroupDTO;
      await this.removeContactFromGroupService.remove(params, request.user!.id);
      return response.status(204).send();
    } catch (error) {
      next(error);
    }
  };
}
