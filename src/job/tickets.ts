import cron from "node-cron";
import apiGlpi from "../common/services/config/apiCrefaz";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";
import { mountAlertTicket } from "../common/services/functions/mountAlert";

export const tickets = cron.schedule("*/1 * * * *", async () => {
  try {
    const { data } = await apiGlpi.get("alerta");

    const embeds: EmbedBuilder[] = [];

    for (const ticket of data) {
      const embed = await mountAlertTicket(ticket);
      if (embed !== null) {
        embeds.push(embed);
      }
    }

    if (embeds.length > 0) {
      await api.post("alert", { embeds });
    }
  } catch (error) {
    console.log(error);
  }
});
