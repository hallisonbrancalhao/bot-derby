import { Request, Response } from "express";
import userService from "./user.service";

class UserController {
  public async create(req: Request, res: Response) {
    await userService.create(req.body);
    return res.send();
  }
  public async find(req: Request, res: Response) {
    await userService.find(req, res);
    return res.send();
  }
}

export default new UserController();
