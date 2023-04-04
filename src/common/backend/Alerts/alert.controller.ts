import { Request, Response } from "express";
import alertService from "./alert.service";

class UserController {
  public async send(req: Request, res: Response) {
    await alertService.send(req, res);
    return res.send();
  }
}

export default new UserController();
