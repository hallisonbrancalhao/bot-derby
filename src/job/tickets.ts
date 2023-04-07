import cron from "node-cron";
import apiGlpi from "../common/services/config/apiCrefaz";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";

export const tickets = cron.schedule("*/5 * * * * *", async () => {
  try {
    const { data } = await apiGlpi.get("alerta");
    if (data.length > 0) {
      const embeds: EmbedBuilder[] = data.map((ticket: any) => {
        const message = `🤖 — ${ticket.tecnico}\n🎫 — [${ticket.ticket_id}] — ${ticket.assunto}`;
        return new EmbedBuilder().setColor("#0099ff").setDescription(message);
      });

      const postData = {
        embeds: embeds,
      };

      await api.post("/alert", postData);
    }
  } catch (error) {
    console.log(error);
  }
});
