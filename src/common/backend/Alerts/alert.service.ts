import { Request, Response } from "express";
const { WebhookClient } = require("discord.js");

class AlertService {
  async send(req: Request, res: Response) {
    const { body } = req;
    const webhook = new WebhookClient({
      url: process.env.BOT_WEBHOOK as string,
    });

    try {
      webhook.send(body.content);
      res.status(200).send("Message sent successfully.");
    } catch (error) {
      console.error(error);
      res.status(500).send("Error sending message.");
    }
  }
}

export default new AlertService();
