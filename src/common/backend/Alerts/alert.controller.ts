import { Request, Response } from "express";
import alertService from "./alert.service";

class AlertController {
  public async send(req: Request, res: Response) {
    const { body } = req;
    const alert: Boolean = await alertService.send(body);
    alert ? res.status(200) : res.status(500);
  }
}

export default new AlertController();
