import cron from "node-cron";
import * as ftp from "basic-ftp";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";

export const enel_ce = cron.schedule("*/5 * * * *", async () => {
  try {
    const client = new ftp.Client();
    await client.access({
      host: process.env.HOST_ENEL_CE as string,
      user: process.env.USER_ENEL_CE as string,
      password: process.env.PASSWORD_ENEL_CE as string,
    });
    client.close();
  } catch (error) {
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle("🚨 FTP ENEL - CE está fora do ar")
      .setDescription(`Host: ${process.env.HOST_ENEL_CE}`)
      .setColor("Red");
    api.post("/alert-ftp", {
      embeds: { embed },
    });
  }
});
