import { Request, Response } from "express";
import alertService from "../Alerts/alert.service";

class AlertController {
  public async send(req: Request, res: Response) {
    const { body } = req;
    await alertService
      .send(body)
      .then(() => res.status(200).send({ message: "Mensagem enviada" }))
      .catch(() => res.status(500).send({ message: "Mensagem não enviada" }));
  }
}

export default new AlertController();
