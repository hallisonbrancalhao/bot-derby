import { Request, Response } from "express";
import userService from "./user.service";

class UserController {
  public async findAll(req: Request, res: Response) {
    const users = await userService.findAll();
    return res.status(200).json(users);
  }

  public async create(req: Request, res: Response) {
    await userService.create(req.body);
    return res.status(201).send();
  }

  public async find(req: Request, res: Response) {
    const users = await userService.findUser(req.params.id);
    return res.status(200).json(users);
  }

  public async delete(req: Request, res: Response) {
    const user = await userService.deleteUser(req.params.id);
    return res.status(200).json(user);
  }

  public async update(req: Request, res: Response) {
    const user = await userService.updateUser(req.params.id, req.body);
    return res.status(200).json(user);
  }
}

export default new UserController();
