import { Schema, model } from "mongoose";
import { ConnectionUserGLPI } from "../types/UserTypes";

const UserSchema = new Schema(
  {
    usernameDiscord: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    usernameGlpi: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

export default model<ConnectionUserGLPI>("User", UserSchema);
