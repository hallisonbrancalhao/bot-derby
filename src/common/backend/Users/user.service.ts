const UserSchema = require("./user.schema");
import { ConnectionUserGLPI } from "../../types/UserTypes";

class UserService {
  async create(data: ConnectionUserGLPI) {
    await UserSchema.create(data);
    return;
  }

  async findAll() {
    const findedUsers = await UserSchema.find();

    return findedUsers;
  }

  async findUser(id: any) {
    const user = await UserSchema.findById(id);
    return user;
  }

  async deleteUser(id: any) {
    const user = await UserSchema.findOneAndDelete({
      _id: id,
    });
    return user;
  }

  async updateUser(id: any, data: ConnectionUserGLPI) {
    const userToUpdate = await UserSchema.findOneAndUpdate(
      { _id: id },
      {
        usernameDiscord: data.usernameDiscord,
        usernameGLPI: data.usernameGLPI,
      }
    );

    const updatedUser = UserSchema.findById(userToUpdate?._id);

    return updatedUser;
  }
}

export default new UserService();
