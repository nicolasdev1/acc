import { PetsRepository } from "../repositories/PetsRepository";

class ListMyPetsService {
  async execute(owner: string) {
    const petsRepository = new PetsRepository();

    const pets = petsRepository.findAllPetsByOwner(owner);

    return pets;
  }
}

export { ListMyPetsService };
