import { AppError } from "../../../shared/errors/AppError";
import { PetsRepository } from "../repositories/PetsRepository";

interface IRequest {
  id: string;
}

class DeletePetService {
  async execute({ id }: IRequest) {
    const petsRepository = new PetsRepository();

    const petExists = await petsRepository.findPetById(id);

    if (!petExists) {
      throw new AppError("Pet not found");
    }

    const pet = await petsRepository.deletePet(id);

    return pet;
  }
}

export { DeletePetService };
