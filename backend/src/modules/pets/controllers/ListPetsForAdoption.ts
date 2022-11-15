import { Request, Response } from "express";

import { ListPetsForAdoptionService } from "../services/ListPetsForAdoptionService";

class ListPetsForAdoption {
  async handle(_: Request, response: Response) {
    const listPetsForAdoptionService = new ListPetsForAdoptionService();

    const pets = await listPetsForAdoptionService.execute();

    return response.status(200).json(pets);
  }
}

export { ListPetsForAdoption };
