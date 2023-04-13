import cron from "node-cron";
import * as ftp from "basic-ftp";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";

export const cpfl = cron.schedule("*/5 * * * *", async () => {
  try {
    const client = new ftp.Client();
    await client.access({
      host: process.env.HOST_CPFL as string,
      user: process.env.USER_CPFL as string,
      password: process.env.PASSWORD_CPFL as string,
    });
    client.close();
  } catch (error) {
    const embed: EmbedBuilder = new EmbedBuilder()
      .setTitle("🚨 FTP CPFL está fora do ar")
      .setDescription(`Host: ${process.env.HOST_CPFL}`)
      .setColor("Red");
    await api.post("/alert-ftp", {
      embeds: { embed },
    });
  }
});
