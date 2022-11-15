import { Request, Response } from "express";

import { RejectAdoptionService } from "../services/RejectAdoptionService";

class RejectAdoptionController {
  async handle(request: Request, response: Response) {
    const { pet_id, interested_user_id } = request.body;

    const rejectAdoptionService = new RejectAdoptionService();

    const pet = await rejectAdoptionService.execute({
      pet_id,
      interested_user_id,
    });

    return response.status(201).json(pet);
  }
}

export { RejectAdoptionController };
