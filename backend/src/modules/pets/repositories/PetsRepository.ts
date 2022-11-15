import { CreatePetDTO } from "../dtos/CreatePetDTO";

import { Pet } from "../models/PetModel";

class PetsRepository {
  async create({
    name,
    age,
    breed,
    gender,
    description,
    images,
    owner,
  }: CreatePetDTO) {
    const pet = await Pet.create({
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

  async findAllPets() {
    const pets = await Pet.find().populate("owner");
    return pets;
  }

  async findAllPetsForAdoption() {
    const pets = await Pet.find({
      status: { $in: ["for_adoption"] },
    })
      .populate("owner")
      .sort({ createdAt: -1 });
    return pets;
  }

  async findAllPetsByOwner(owner: string) {
    const pets = await Pet.find({ owner })
      .populate("owner")
      .sort({ createdAt: -1 });
    return pets;
  }

  async findById(id: string) {
    const pet = await Pet.findById(id);
    return pet;
  }

  async findPetById(id: string) {
    const pet = await Pet.findById(id).populate("owner");
    return pet;
  }

  async findRequestedPets(user_id: string) {
    const pets = await Pet.find({
      interested_users: { $in: [user_id] },
    })
      .populate("owner")
      .sort({ createdAt: -1 });

    return pets;
  }

  // listar pets do user logado que contem interested_users
  async findReceivedPets(user_id: string) {
    const pets = await Pet.find({
      owner: { $in: [user_id] },
      interested_users: { $ne: [] },
    })
      .populate("owner")
      .populate("interested_users")
      .sort({ createdAt: -1 });

    return pets;
  }

  async deletePet(id: string) {
    const pet = await Pet.findByIdAndDelete(id);
    return pet;
  }

  async update(id: string, data: any) {
    const pet = await Pet.findByIdAndUpdate(id, data, { new: true });
    return pet;
  }
}

export { PetsRepository };
