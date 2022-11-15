import moment from "moment";
import { UserProps } from "../@types/user";
import { AuthData } from "../contexts/Auth";
import { httpService } from "./httpService";

function login(email: string, password: string): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    httpService
      .post("/users/login/", {
        email,
        password,
      })
      .then((response) => {
        resolve({
          token: response.data.token,
          user: response.data.user,
        });
      })
      .catch((error) => {
        reject(new Error("Desculpe, e-mail ou senha incorretos"));
        console.log("login error:");
        console.log(error);
      });
  });
}

function register({
  name,
  email,
  password,
  cpfCnpj,
  gender,
  birthday,
  phone,
  address,
  avatar,
}: UserProps): Promise<AuthData> {
  return new Promise((resolve, reject) => {
    const form = new FormData();
    form.append("name", name);
    form.append("email", email);
    form.append("password", password);
    birthday
      ? form.append("birthday", moment(birthday, "DD/MM/YYYY").toISOString())
      : null;
    form.append("cpfCnpj", cpfCnpj);
    gender ? form.append("gender", gender) : null;
    form.append("phone", phone);
    form.append("address[city]", address.city);
    form.append("address[federativeUnit]", address.federativeUnit);
    form.append("address[number]", address.number);
    form.append("address[street]", address.street);
    form.append("address[zipCode]", address.zipCode);
    avatar != undefined
      ? form.append("avatar", {
          name: avatar?.fileName ? avatar.fileName + "_user.jpg" : "_user.jpg",
          uri: avatar?.uri,
          type: "image/jpg",
        })
      : null;

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    httpService
      .post("/users/", form, config)
      .then((response) => {
        resolve({
          token: response.data.token,
          user: response.data.user,
        });
        console.log("register success:");
        console.log(response);
      })
      .catch((error) => {
        reject(new Error("Desculpe, não foi possível cadastrar seu usuário"));
        console.log("register error:");
        console.log(error);
      });
  });
}

export const authService = {
  login,
  register,
};
