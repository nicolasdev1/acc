import { PetsRepository } from "../repositories/PetsRepository";

class ListAllPetsService {
  async execute() {
    const petsRepository = new PetsRepository();

    const pets = petsRepository.findAllPets();

    return pets;
  }
}

export { ListAllPetsService };
