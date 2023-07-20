import cron from "node-cron";
import Client from "ssh2-sftp-client";
import api from "../common/services/config/apiMongoDB";
import { EmbedBuilder } from "discord.js";

process.env.TZ = "America/Sao_Paulo";

let lastFileList: string[] = [];
export const arquivosCoelba = cron.schedule("0 * * * *", async () => {
  const client = new Client();
  try {
    await client.connect({
      host: process.env.HOST_COELBA,
      username: process.env.USER_COELBA,
      password: process.env.PASSWORD_COELBA,
    });

    const folderPath = "/home/terceiros/retorno";

    const currentFileList = (await client.list(folderPath))
      .filter((FileInfo) => FileInfo.type !== "d")
      .map((FileInfo) => FileInfo.name);

    const newFiles = currentFileList.filter(
      (fileName) => !lastFileList.includes(fileName)
    );
    if (newFiles.length > 0) {
      const embed = new EmbedBuilder();
      embed.setTitle("[COELBA] 📄 Novos retornos disponibilizados.");
      embed.addFields({ name: "Arquivos:", value: `${newFiles.join("\n")}` });

      embed.setColor("Green");

      api.post("/alert/files-ftp", {
        embeds: [embed],
      });
    }

    lastFileList = currentFileList;
  } catch (error) {
    const embed = new EmbedBuilder();
    embed.setTitle("⚠️ FTP Inacessível");
    embed.setDescription(`Não foi possível acessar o **FTP COELBA**`);
    embed.setColor("Red");

    api.post("/alert/files-ftp", {
      embeds: [embed],
    });
  } finally {
    await client.end();
  }
});
