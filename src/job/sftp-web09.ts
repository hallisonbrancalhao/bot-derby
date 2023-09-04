import cron from "node-cron";
import Client from "ssh2-sftp-client";
import api from "../common/services/config/apiMongoDB";
import axios from "axios";
import { payloadWebHook } from "../assets/data/wh-sftp";

export const sftpJob = cron.schedule("*/5 * * * *", async () => {
  const client = new Client();
  try {
    await client.connect({
      host: process.env.SFTP_HOST,
      username: process.env.SFTP_USER,
      password: process.env.SFTP_PASSWORD,
      port: Number(process.env.SFTP_PORT),
    });
  } catch (error) {
    axios.post(process.env.TEAMS_WEBHOOK as string, payloadWebHook);

    api.post("/alert-monitoring", {
      content: `@here ⚠️ **[SFTP WEB-09]** Fora do ar`,
    });
  } finally {
    await client.end();
  }
});
