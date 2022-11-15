import { Request, Response } from "express";

import { ListReceivedVisitsService } from "../services/ListReceivedVisitsService";

class ListReceivedVisitsController {
  async handle(request: Request, response: Response) {
    const listReceivedVisitsService = new ListReceivedVisitsService();

    const pets = await listReceivedVisitsService.execute(request.user.id);

    return response.status(200).json(pets);
  }
}

export { ListReceivedVisitsController };
