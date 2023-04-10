import { UserModel } from "./user.schema";
import { IUser } from "../../types/UserTypes";

class UserService {
  async create(data: IUser) {
    const user = new UserModel(data);
    return await user.save();
  }

  async find(discordId: string): Promise<IUser | null> {
    try {
      const user: IUser | null = await UserModel.findOne({
        discordId: discordId,
      });
      return user;
    } catch (err) {
      console.error("❌" + err);
      return null;
    }
  }
  async findAll(): Promise<IUser[] | null> {
    try {
      const user: IUser[] | null = await UserModel.find();
      return user;
    } catch (err) {
      console.error("❌" + err);
      return null;
    }
  }
}

export default new UserService();
