import { Collection, Schema, model } from "mongoose";
import { ConnectionUserGLPI } from "../../types/UserTypes";
import { ObjectId } from "bson";

const UserSchema = new Schema(
  {
    id: {
      type: ObjectId,
      required: true,
      unique: true,
    },
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

export default model<ConnectionUserGLPI>("users", UserSchema);
