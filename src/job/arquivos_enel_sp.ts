import cron from "node-cron";
import { Client } from "basic-ftp";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";

let lastFileList: string[] = [];

export const arquivosEnelSp = cron.schedule("*/5 * * * * *", async () => {
  try {
    const client = new Client();
    await client.access({
      host: process.env.TEST_FTP_IP as string,
      user: process.env.TEST_FTP_USER as string,
      password: process.env.TEST_FTP_PASSWORD as string,
    });

    const folderPath = "/domains/brancalhao.com.br/arquivos";

    const currentFileList = (await client.list(folderPath)).map(
      (fileInfo) => fileInfo.name
    );

    const newFiles = currentFileList.filter(
      (fileName) => !lastFileList.includes(fileName)
    );
    if (newFiles.length > 0) {
      const embed = new EmbedBuilder();
      embed.setTitle("📄 Arquivos na ENEL SP");
      embed.setDescription(
        `**Novos arquivos disponíveis**: 
        ${newFiles.join("\n")}`
      );
      embed.setColor("Green");

      api.post("/alert/files-ftp", {
        embeds: [embed],
      });
    }

    lastFileList = currentFileList;

    client.close();
  } catch (error) {
    const embed = new EmbedBuilder();
    embed.setTitle("⚠️ FTP Inacessível");
    embed.setDescription(`**Não foi possível acessar o FTP ENEL-SP **`);
    embed.setColor("Red");

    api.post("/alert/files-ftp", {
      embeds: [embed],
    });
  }
});
