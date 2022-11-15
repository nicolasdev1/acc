import { Request, Response } from "express";

import { CreateUserService } from "../services/CreateUserService";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      avatar,
      email,
      password,
      cpfCnpj,
      gender,
      birthday,
      phone,
      address,
    } = request.body;

    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
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

    return response.status(201).json(user);
  }
}

export { CreateUserController };
