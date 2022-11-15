import { Request, Response } from "express";

import { ListAllPetsService } from "../services/ListAllPetsService";

class ListAllPetsController {
  async handle(_: Request, response: Response) {
    const listAllPetsService = new ListAllPetsService();

    const pets = await listAllPetsService.execute();

    return response.status(200).json(pets);
  }
}

export { ListAllPetsController };
