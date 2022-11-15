import { Request, Response } from "express";

import { ListRequestedVisitsService } from "../services/ListRequestedVisitsService";

class ListRequestedVisitsController {
  async handle(request: Request, response: Response) {
    const listRequestedVisitsService = new ListRequestedVisitsService();

    const pets = await listRequestedVisitsService.execute(request.user.id);

    return response.status(200).json(pets);
  }
}

export { ListRequestedVisitsController };
