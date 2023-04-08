import { Request, Response } from "express";
import alertService from "./alert.service";

class AlertController {
  public async send(req: Request, res: Response) {
    const { body } = req;
    await alertService
      .send(body)
      .then(() => res.status(200).json({ message: "Mensagem enviada" }))
      .catch(() => res.status(500));
  }
}

export default new AlertController();
