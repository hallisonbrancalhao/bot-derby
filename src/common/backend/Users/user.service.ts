import { UserModel } from "./user.schema";
import { IUser } from "../../types/UserTypes";

class UserService {
  async create(data: IUser) {
    const newUser = new UserModel(data);
    await newUser.save();
    return newUser;
  }
}

export default new UserService();
