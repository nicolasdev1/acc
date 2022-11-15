import { User } from "../models/UserModel";

import { CreateUserDTO } from "../dtos/CreateUserDTO";
import { UpdateUserDTO } from "../dtos/UpdateUserDTO";
import { UpdateAvatarUserDTO } from "../dtos/UpdateAvatarUserDTO";

class UsersRepository {
  async create({
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
    const user = await User.create({
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

    return user;
  }

  async verifyEmail(email: string) {
    const user = await User.findOne({ email });

    return user;
  }

  async findByEmail(email: string) {
    const user = await User.findOne({ email }).select("+password");

    return user;
  }

  async findById(id: string) {
    const user = await User.findById(id);
    return user;
  }

  async updateAvatar(id: string, data: UpdateAvatarUserDTO) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    return user?.avatar;
  }

  async update(id: string, data: UpdateUserDTO) {
    const user = await User.findByIdAndUpdate(id, data, { new: true });

    return user;
  }
}

export { UsersRepository };
