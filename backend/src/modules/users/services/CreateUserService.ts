import { sign } from "jsonwebtoken";
import authConfig from "../../../config/auth";

import { UsersRepository } from "../repositories/UsersRepository";
import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { AppError } from "../../../shared/errors/AppError";

class CreateUserService {
  async execute({
    name,
    avatar,
    email,
    password,
    cpfCnpj,
    gender,
    birthday,
    phone,
    address,
  }: CreateUserDTO) {
    const usersRepository = new UsersRepository();

    const verifyUser = await usersRepository.verifyEmail(email);

    if (verifyUser) {
      throw new AppError("Email already exists");
    }

    const user = await usersRepository.create({
      name,
      avatar,
      email,
      password,
      cpfCnpj,
      gender,
      birthday,
      phone,
      address,
    });

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}

export { CreateUserService };
