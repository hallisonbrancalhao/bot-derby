const { WebhookClient } = require("discord.js");

class AlertService {
  async send(data: any) {
    try {
      const webhookTiAlert = new WebhookClient({
        url: process.env.WEBHOOK_ALERT as string,
      });
      return webhookTiAlert.send(data);
    } catch (error) {
      throw new Error("Erro");
    }
  }

  async sendFtp(data: any) {
    try {
      const webhookTiAlert = new WebhookClient({
        url: process.env.WEBHOOK_ALERT_MONITORAMENTO as string,
      });
      return webhookTiAlert.send(data);
    } catch (error) {
      throw new Error("Erro");
    }
  }

  async files(data: any) {
    try {
      const webhookTiAlert = new WebhookClient({
        url: process.env.WEBHOOK_ALERT_FTP as string,
      });
      return webhookTiAlert.send(data);
    } catch (error) {
      throw new Error("Erro");
    }
  }

  async sendMonitoring(data: any) {
    try {
      const webhookTiAlert = new WebhookClient({
        url: process.env.WEBHOOK_ALERT_MONITORAMENTO as string,
      });
      return webhookTiAlert.send(data);
    } catch (error) {
      throw new Error("Erro");
    }
  }
}

export default new AlertService();
