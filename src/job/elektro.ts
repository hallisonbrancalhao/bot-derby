import cron from "node-cron";
import * as ftp from "basic-ftp";
import api from "../common/services/config/apiMongoDB";

export const elektro = cron.schedule("*/5 * * * *", async () => {
  try {
    const client = new ftp.Client();
    await client.access({
      host: process.env.TEST_FTP_HOST as string,
      user: process.env.TEST_FTP_USER as string,
      password: process.env.TEST_FTP_PASSWORD as string,
    });
    console.log("Conexão FTP bem sucedida");
    client.close();
  } catch (error) {
    console.error(error);
    api.post("/alert", {
      content: `
        @everyone
        ❌❌❌ Conexão com o FTP falhou ❌❌❌:
        HOST: ${process.env.TEST_FTP_HOST}`,
    });
  }
});
