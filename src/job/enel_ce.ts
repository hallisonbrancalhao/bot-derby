import cron from "node-cron";
import * as ftp from "basic-ftp";
import api from "../common/services/config/apiMongoDB";
import { mountAlertFtp } from "./mountAlerts/mountAlertFtp";

export const enel_ce = cron.schedule("*/5 * * * * *", async () => {
  try {
    const client = new ftp.Client();
    await client.access({
      host: process.env.HOST_ENEL_CE as string,
      user: process.env.USER_ENEL_CE as string,
      password: process.env.PASSWORD_ENEL_CE as string,
    });
    client.close();
  } catch (error) {
    const embed = await mountAlertFtp("ENEL CE");
    await api.post("alert-ftp", { embeds: [embed] });
  }
});
