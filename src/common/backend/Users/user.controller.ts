import { Request, Response } from "express";
import userService from "./user.service";
import { IUser } from "../../types/UserTypes";

class UserController {
  public async create(req: Request, res: Response) {
    try {
      const user = await userService.create(req.body);
      return res.status(201);
    } catch (error) {
      return res.status(400);
    }
  }
  public async find(req: Request, res: Response) {
    const { discordId } = req.params;
    const user = await userService.find(discordId);
    return res.send(user);
  }

  public async findAll(req: Request, res: Response) {
    const users: IUser[] | null = await userService.findAll();
    if (users) return res.status(201).json(users);
    return res.status(404);
  }
}

export default new UserController();
