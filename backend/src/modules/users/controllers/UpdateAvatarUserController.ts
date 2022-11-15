import { Request, Response } from "express";

import { UpdateAvatarUserService } from "../services/UpdateAvatarUserService";

class UpdateAvatarUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;

    const { avatar } = request.body;

    const updateAvatarUserService = new UpdateAvatarUserService();

    const userAvatar = await updateAvatarUserService.execute(id, avatar);

    return response.status(200).json(userAvatar);
  }
}

export { UpdateAvatarUserController };
