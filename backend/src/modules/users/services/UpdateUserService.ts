import { AppError } from "../../../shared/errors/AppError";

import { UsersRepository } from "../repositories/UsersRepository";

interface IAddress {
  street: string;
  number: number;
  zipCode: string;
  city: string;
}

interface IRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: IAddress;
  avatar: string;
}

class UpdateUserService {
  async execute({ id, name, email, phone, address, avatar }: IRequest) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new AppError("User not found");
    }

    if (email !== user.email) {
      const userAlreadyExists = await usersRepository.verifyEmail(email);

      if (userAlreadyExists) {
        throw new AppError("Email already in use");
      }
    }

    const updateUser = await usersRepository.update(id, {
      name,
      email,
      phone,
      address,
      avatar,
    });

    return updateUser;
  }
}

export { UpdateUserService };
