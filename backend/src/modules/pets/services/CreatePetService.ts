import { PetsRepository } from "../repositories/PetsRepository";

import { CreatePetDTO } from "../dtos/CreatePetDTO";

class CreatePetService {
  async execute({
    name,
    age,
    breed,
    gender,
    description,
    images,
    owner,
  }: CreatePetDTO) {
    const petsRepository = new PetsRepository();

    const pet = await petsRepository.create({
      name,
      age,
      breed,
      gender,
      description,
      images,
      owner,
    });

    return pet;
  }
}

export { CreatePetService };
