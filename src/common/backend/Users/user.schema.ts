import { Schema, model } from "mongoose";
import { IUser } from "../../types/UserTypes";
import { ObjectId } from "bson";

const userSchema = new Schema<IUser>(
  {
    discordId: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    usernameGLPI: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model<IUser>("Users", userSchema);
