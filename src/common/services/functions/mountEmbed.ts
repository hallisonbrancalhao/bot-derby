import { EmbedBuilder } from "discord.js";

export async function mountEmbed(ticket: any) {
  if (!ticket) return null;
  const embed: EmbedBuilder = new EmbedBuilder()
    .setColor("Aqua")
    .setTitle(`🎫 ${ticket.name}`)
    .setDescription(`Criado em: ${ticket.date_creation as Date}`)
    .setFields({
      name: "Prioridade",
      value: `Níve: ${ticket.priority}`,
    })
    .setFields({
      name: "Urgência",
      value: `Níve: ${ticket.urgency}`,
    })
    .setFields({
      name: "Status",
      value: `${ticket.status_desc}`,
    });
  return embed;
}
