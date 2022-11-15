import { Request, Response } from "express";

import { DeletePetService } from "../services/DeletePetService";

class DeletePetController {
  async handle(request: Request, response: Response) {
    const { id } = request.params;

    const deletePetService = new DeletePetService();

    const pet = await deletePetService.execute({ id });

    return response.json({
      message: "Pet deleted successfully",
      pet,
    });
  }
}

export { DeletePetController };
