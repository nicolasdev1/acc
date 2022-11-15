import { Request, Response } from "express";

import { SessionUserService } from "../services/SessionUserService";

class SessionUserController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    const sessionUserService = new SessionUserService();

    const { user, token } = await sessionUserService.execute({
      email,
      password,
    });

    return response.json({ user, token });
  }
}

export { SessionUserController };
