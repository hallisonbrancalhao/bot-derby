import { EmbedBuilder, Guild, Role } from "discord.js";

import { client } from "../..";

export async function mountAlertFtp(ftp: string) {
  const guild: Guild | undefined = client.guilds.cache.get(
    "1093626372116709426"
  );

  if (!guild) {
    console.log("Servidor nao encontrado");
    return;
  }

  const [members] = guild.members.cache;

  members.forEach((member: any) => {
    const user = member.user;
    const roles: Role[] = member.roles.cache.array().slice(1);
    const roleNames = roles
      .map((role: Role) => {
        role.name;
      })
      .join(", ");
    console.log(`${user.username}#${user.discriminator} - ${roleNames}`);
  });

  const embed: EmbedBuilder = new EmbedBuilder()
    .setTitle(`🚨 FTP ${ftp}  está fora do ar`)
    .setDescription(`Host: ${process.env.HOST_ENEL_CE}`)
    .setColor("Red");
  return embed;
}
