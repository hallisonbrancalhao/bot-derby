import { Request, Response } from "express";
import userService from "./user.service";

class UserController {
  public async create(req: Request, res: Response) {
    await userService.create(req.body);
    return res.status(201).send();
  }
}

export default new UserController();
