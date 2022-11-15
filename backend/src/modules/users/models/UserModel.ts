/* eslint-disable @typescript-eslint/naming-convention */
import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";

import { IUser } from "../types/User";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    cpfCnpj: {
      type: String,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      uppercase: true,
      required: false,
    },
    birthday: {
      type: Date,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      street: {
        type: String,
        required: true,
      },
      number: {
        type: Number,
        required: true,
      },
      zipCode: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },
      federativeUnit: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  }
);

// Hash password before saving to database
userSchema.pre("save", async function (next) {
  const ong = this as IUser;

  if (!ong.isModified("password")) return next();

  ong.password = await bcrypt.hash(ong.password, 8);

  return next();
});

// Compare password
userSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  const ong = this as IUser;

  return bcrypt
    .compare(candidatePassword, ong.password)
    .catch((_: any) => false);
};

const User = model<IUser>("User", userSchema);

export { User };
