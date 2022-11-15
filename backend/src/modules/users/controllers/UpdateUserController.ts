import { Request, Response } from "express";

import { UpdateUserService } from "../services/UpdateUserService";

class UpdateUserController {
  async handle(request: Request, response: Response) {
    const { id } = request.user;
    const { name, email, phone, address, avatar } = request.body;

    const updateUserService = new UpdateUserService();

    const user = await updateUserService.execute({
      id,
      name,
      email,
      phone,
      address,
      avatar,
    });

    return response.status(200).json(user);
  }
}

export { UpdateUserController };
