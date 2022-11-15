import { Schema, model } from "mongoose";
import { IPet } from "../types/Pet";

const petSchema = new Schema<IPet>(
  {
    name: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      enum: ["M", "F"],
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    status: {
      type: String,
      enum: ["for_adoption", "adopted"],
      default: "for_adoption",
      required: true,
    },
    images: {
      type: [String],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    interested_users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Pet = model<IPet>("Pet", petSchema);

export { Pet };
