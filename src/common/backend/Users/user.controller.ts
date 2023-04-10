import { Request, Response } from "express";
import { IUser } from "../../types/UserTypes";
import userService from "../Users/user.service";

class UserController {
  public async create(req: Request, res: Response) {
    try {
      return await userService
        .create(req.body)
        .then((response) => res.status(201).send(response));
    } catch (error) {
      return res.status(400).send({ message: "Usuário duplicado" });
    }
  }
  public async find(req: Request, res: Response) {
    try {
      const user = await userService.find(req.params.discordId);
      return res.send(user);
    } catch (err) {
      return res.send(err);
    }
  }

  public async findAll(req: Request, res: Response) {
    try {
      const users: IUser[] | null = await userService.findAll();
      if (users) return res.status(201).send(users);
    } catch (error) {
      return res.status(404);
    }
  }
}

export default new UserController();
