import { PetsRepository } from "../repositories/PetsRepository";

class ListReceivedVisitsService {
  async execute(user_id: string) {
    const petsRepository = new PetsRepository();

    const pets = await petsRepository.findReceivedPets(user_id);

    return pets;
  }
}

export { ListReceivedVisitsService };
