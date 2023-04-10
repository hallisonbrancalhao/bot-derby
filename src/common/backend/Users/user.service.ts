import { UserModel } from "../Users/user.schema";
import { IUser } from "../../types/UserTypes";

class UserService {
  async create(data: IUser) {
    const user = new UserModel(data);
    return await user.save();
  }

  async find(discordId: string): Promise<IUser | null> {
    return await UserModel.findOne({
      discordId: discordId,
    });
  }

  async findByUsername(usernameGLPI: string): Promise<IUser | null> {
    return await UserModel.findOne({
      usernameGLPI: usernameGLPI,
    });
  }
  async findAll(): Promise<IUser[] | null> {
    return await UserModel.find();
  }
}

export default new UserService();
