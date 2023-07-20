import cron from "node-cron";
import { Client } from "basic-ftp";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";

process.env.TZ = "America/Sao_Paulo";

let lastFileList: string[] = [];
export const arquivosCelpe = cron.schedule("0 13-17 * * *", async () => {
  try {
    const client = new Client();
    await client.access({
      host: process.env.HOST_CELPE as string,
      user: process.env.USER_CELPE as string,
      password: process.env.PASSWORD_CELPE as string,
    });

    const folderPath = "/home/terceiros/retorno";

    const currentFileList = (await client.list(folderPath)).map(
      (fileInfo) => fileInfo.name
    );

    const newFiles = currentFileList.filter(
      (fileName) => !lastFileList.includes(fileName)
    );
    if (newFiles.length > 0) {
      const embed = new EmbedBuilder();
      embed.setTitle("[CELPE] 📄 Novos retornos disponibilizados.");
      embed.addFields({ name: "Arquivos:", value: `${newFiles.join("\n")}` });

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
    embed.setDescription(`Não foi possível acessar o **FTP CELPE**`);
    embed.setColor("Red");

    api.post("/alert/files-ftp", {
      embeds: [embed],
    });
  }
});
