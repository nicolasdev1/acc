import { Request, Response } from "express";

import { ListMyPetsService } from "../services/ListMyPetsService";

class ListMyPetsController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const listMyPetsService = new ListMyPetsService();

    const pets = await listMyPetsService.execute(id);

    return response.status(200).json({
      pets,
    });
  }
}

export { ListMyPetsController };
