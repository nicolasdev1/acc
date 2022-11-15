import { Request, Response } from "express";

import { ListMyPetsService } from "../services/ListMyPetsService";

class ListPetsByOwnerController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const listPetsByOwnerService = new ListMyPetsService();

    const pets = await listPetsByOwnerService.execute(id);

    return response.status(200).json({
      pets,
    });
  }
}

export { ListPetsByOwnerController };
