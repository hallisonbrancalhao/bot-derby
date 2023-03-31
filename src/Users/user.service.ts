import User from "./user.schema";
import { ConnectionUserGLPI } from "../types/UserTypes";

class UserService {
  async create(data: ConnectionUserGLPI) {
    await User.create(data);
    return;
  }

  async findAll() {
    const findedUsers = await User.find();

    return findedUsers;
  }

  async findUser(id: any) {
    const user = await User.findById(id);
    return user;
  }

  async deleteUser(id: any) {
    const user = await User.findOneAndDelete({
      _id: id,
    });
    return user;
  }

  async updateUser(id: any, data: ConnectionUserGLPI) {
    const userToUpdate = await User.findOneAndUpdate(
      { _id: id },
      {
        usernameDiscord: data.usernameDiscord,
        usernameGLPI: data.usernameGLPI,
      }
    );

    const updatedUser = User.findById(userToUpdate?._id);

    return updatedUser;
  }
}

export default new UserService();
