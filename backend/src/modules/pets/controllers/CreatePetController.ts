import { Request, Response } from "express";

import { CreatePetService } from "../services/CreatePetService";

class CreatePetController {
  async handle(request: Request, response: Response) {
    const { name, age, breed, gender, images, description } = request.body;

    const createPetService = new CreatePetService();

    // User logado na aplicação
    const { id } = request.user;

    const pet = await createPetService.execute({
      name,
      age,
      breed,
      gender,
      description,
      images,
      owner: id,
    });

    return response.status(201).json(pet);
  }
}

export { CreatePetController };
