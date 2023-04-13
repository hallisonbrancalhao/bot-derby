import cron from "node-cron";
import apiGlpi from "../common/services/config/apiCrefaz";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";
import { mountAlertTicket } from "../common/services/functions/mountAlert";

export const tickets = cron.schedule("*/1 * * * *", async () => {
  try {
    const { data } = await apiGlpi.get("alerta");
    const embeds: EmbedBuilder[] = [];
    const tecnico = [];

    for (const ticket of data) {
      const response = await mountAlertTicket(ticket);
      if (response !== null) {
        embeds.push(response.embed);
        tecnico.push(response.tecnico);
      }
    }

    if (embeds.length > 0) {
      await api.post("alert", {
        content: `⚠️ Técnicos(s): ${tecnico.join(", ")}`,
        embeds,
      });
    }
  } catch (error) {
    console.log(error);
  }
});
