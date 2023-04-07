import { Request, Response } from "express";
import alertService from "./alert.service";

class AlertController {
  public async send(req: Request, res: Response) {
    const { body } = req;
    console.log(body);
    await alertService.send(body);
  }
}

export default new AlertController();
