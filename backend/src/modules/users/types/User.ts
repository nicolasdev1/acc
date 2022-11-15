import { Document, Types } from "mongoose";

interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  avatar: string;
  email: string;
  password: string;
  cpfCnpj: string;
  gender: string;
  birthday: Date;
  phone: string;
  address: {
    street: string;
    number: string;
    zipCode: string;
    city: string;
    federativeUnit: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

export { IUser };
