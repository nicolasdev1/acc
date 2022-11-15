import { PetsRepository } from "../repositories/PetsRepository";

import { RequestPetVisitDTO } from "../dtos/RequestPetVisitDTO";
import { UsersRepository } from "../../users/repositories/UsersRepository";
import { AppError } from "../../../shared/errors/AppError";

class RequestPetVisitService {
  async execute({ pet_id, interested_user_id }: RequestPetVisitDTO) {
    const usersRepository = new UsersRepository();
    const petsRepository = new PetsRepository();

    const pet = await petsRepository.findById(pet_id);

    if (!pet) {
      throw new AppError("Pet not found");
    }

    const interestedUser = await usersRepository.findById(interested_user_id);

    if (!interestedUser) {
      throw new AppError("User not found");
    }

    const updatedPet = await petsRepository.update(pet_id, {
      $push: {
        interested_users: interestedUser,
      },
    });

    return updatedPet;
  }
}

export { RequestPetVisitService };
