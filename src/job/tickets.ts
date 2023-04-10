import cron from "node-cron";
import apiGlpi from "../common/services/config/apiCrefaz";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";
import { mountAlertTicket } from "../common/services/functions/mountAlert";

export const tickets = cron.schedule("*/1 * * * *", async () => {
  try {
    const { data } = await apiGlpi.get("alerta");

    if (data.length > 0) {
      const embeds: EmbedBuilder[] = data.map((ticket: any) => {
        const embed: EmbedBuilder | null = mountAlertTicket(ticket);
        if (embed) {
          return mountAlertTicket(ticket);
        }
      });
      const postData = {
        embeds: embeds,
      };
      await api
        .post("/alert", postData)
        .then((res) => console.log(res.data.message));
    }
  } catch (error) {
    console.log(error);
  }
});
