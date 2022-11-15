import { UsersRepository } from "../repositories/UsersRepository";

class UpdateAvatarUserService {
  async execute(id: string, avatar: string) {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    const updateAvatar = await usersRepository.updateAvatar(id, { avatar });

    return updateAvatar;
  }
}

export { UpdateAvatarUserService };
