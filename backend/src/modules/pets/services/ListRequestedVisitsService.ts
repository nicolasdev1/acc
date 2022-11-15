import { PetsRepository } from "../repositories/PetsRepository";

class ListRequestedVisitsService {
  async execute(user_id: string) {
    const petsRepository = new PetsRepository();

    const pets = await petsRepository.findRequestedPets(user_id);

    return pets;
  }
}

export { ListRequestedVisitsService };
