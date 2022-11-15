import { Document, Types } from "mongoose";

export interface IPet extends Document {
  _id: Types.ObjectId;
  name: string;
  breed: string;
  age: number;
  gender: string;
  description: string;
  status: string;
  images: [string];
  owner: Types.ObjectId;
  interested_users: [Types.ObjectId];
  createdAt: Date;
  updatedAt: Date;
}
