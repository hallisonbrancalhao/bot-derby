import { EmbedBuilder } from "discord.js";

export async function mountEmbedFiles(cia: string, newFiles: string[]) {
  const embed = new EmbedBuilder();
  embed.setTitle(`📄 Arquivos na ${cia}`);
  embed.setDescription(
    `**Novos arquivos disponíveis**: 
        ${newFiles.join("\n")}`
  );
  embed.setColor("Green");
  return embed;
}
