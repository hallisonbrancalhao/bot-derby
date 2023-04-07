const { WebhookClient } = require("discord.js");

class AlertService {
  async send(data: any) {
    try {
      const webhook = new WebhookClient({
        url: process.env.BOT_WEBHOOK as string,
      });
      webhook.send(data);
    } catch (error) {
      throw new Error("Erro");
    }
  }
}

export default new AlertService();
