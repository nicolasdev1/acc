import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import authConfig from "../../../config/auth";
import { UsersRepository } from "../repositories/UsersRepository";

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: any;
  token: string;
}

class SessionUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = new UsersRepository();

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Incorrect email/password combination.");
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new Error("Incorrect email/password combination.");
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}

export { SessionUserService };
