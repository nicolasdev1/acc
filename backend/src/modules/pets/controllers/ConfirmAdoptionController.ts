import { Request, Response } from "express";

import { ConfirmAdoptionService } from "../services/ConfirmAdoptionService";

class ConfirmAdoptionController {
  async handle(request: Request, response: Response) {
    const { pet_id, interested_user_id } = request.body;

    const confirmAdoptionService = new ConfirmAdoptionService();

    const pet = await confirmAdoptionService.execute({
      pet_id,
      interested_user_id,
    });

    return response.status(201).json(pet);
  }
}

export { ConfirmAdoptionController };
