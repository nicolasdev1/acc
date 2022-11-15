import { PetsRepository } from "../repositories/PetsRepository";

import { RequestPetVisitDTO } from "../dtos/RequestPetVisitDTO";
import { UsersRepository } from "../../users/repositories/UsersRepository";
import { AppError } from "../../../shared/errors/AppError";

class RejectAdoptionService {
  async execute({ pet_id, interested_user_id }: RequestPetVisitDTO) {
    const petsRepository = new PetsRepository();

    const pet = await petsRepository.findById(pet_id);

    if (!pet) {
      throw new AppError("Pet not found");
    }

    // Remove interested_user_id from interested_users array
    const updatedPet = await petsRepository.update(pet_id, {
      $pull: {
        interested_users: interested_user_id,
      },
    });

    // Remove interested_users array if empty
    if (updatedPet && updatedPet.interested_users.length < 1) {
      await petsRepository.update(pet_id, {
        $unset: {
          interested_users: "",
        },
      });
    }

    return updatedPet;
  }
}

export { RejectAdoptionService };
