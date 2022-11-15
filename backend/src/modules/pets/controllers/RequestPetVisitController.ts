import { Request, Response } from "express";

import { RequestPetVisitService } from "../services/RequestPetVisitService";

class RequestPetVisitController {
  async handle(request: Request, response: Response) {
    const { pet_id } = request.params;
    const { id } = request.user;

    const requestPetVisitService = new RequestPetVisitService();

    const pet = await requestPetVisitService.execute({
      pet_id,
      interested_user_id: id,
    });

    return response.status(201).json(pet);
  }
}

export { RequestPetVisitController };
