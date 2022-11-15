import { PetsRepository } from "../repositories/PetsRepository";

class ListPetsForAdoptionService {
  async execute() {
    const petsRepository = new PetsRepository();

    const pets = await petsRepository.findAllPetsForAdoption();

    return pets;
  }
}

export { ListPetsForAdoptionService };
