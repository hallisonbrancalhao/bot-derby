import { UserModel } from "./user.schema";
import { Request, Response } from "express";
import { IUser } from "../../types/UserTypes";

class UserService {
  async create(data: IUser) {
    try {
      const user = new UserModel(data);
      const res = await user.save();
      console.log("✅ Usuário criado!".green);
      return res;
    } catch (error) {
      throw new Error("❌ Erro ao criar o usuário");
    }
  }

  async find(req: Request, res: Response) {
    const { discordId } = req.params;
    try {
      const user: IUser | null = await UserModel.findOne({
        discordId: discordId,
      });
      if (user) return res.status(201).json(user);
      return res.status(404).json({ message: "Usuário não encontrado" });
    } catch (err) {
      return res.status(500).json({ message: "Erro interno do servidor." });
    }
  }
}

export default new UserService();
