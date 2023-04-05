const { WebhookClient } = require("discord.js");

class AlertService {
  async send(body: any): Promise<Boolean> {
    try {
      const webhook = new WebhookClient({
        url: process.env.BOT_WEBHOOK as string,
      });
      webhook.send(body.content);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export default new AlertService();
