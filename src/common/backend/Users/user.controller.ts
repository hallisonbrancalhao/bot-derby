import { Request, Response } from "express";
import userService from "./user.service";
import { IUser } from "../../types/UserTypes";

class UserController {
  public async create(req: Request, res: Response) {
    const user = await userService.create(req.body);
    if (!user) return res.status(400).send(null);
    return res.send();
  }
  public async find(req: Request, res: Response) {
    const { discordId } = req.params;
    const user = await userService.find(discordId);
    if (user) return res.status(201).json(user);
    return res.status(404).json({ message: "Usuário não encontrado" });
  }

  public async findAll(req: Request, res: Response) {
    const users: IUser[] | null = await userService.findAll();
    if (users) return res.status(201).json(users);
    return res.status(404).json({ message: "Usuário não encontrado" });
  }
}

export default new UserController();
