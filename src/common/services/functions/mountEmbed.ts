import { ColorResolvable, EmbedBuilder, User } from "discord.js";
import { colors } from "../../utils/colors";
import { priority } from "../../utils/priority";
import { extractHtmlStructure } from "./mountTicketsResume";

import * as he from "he";

function decodeHtmlEntity(html: string): string {
  return he.decode(html);
}

export async function mountEmbed(ticket: any) {
  if (ticket === undefined) return null;
  let description = "<html>";
  description += decodeHtmlEntity(ticket.content);
  description += "</html>";
  if (description.length > 4000) description = description.substring(0, 2000);

  const formattedTable = extractHtmlStructure(description);
  const color = colors[ticket.status];
  const priorityTickets = priority[ticket.priority];

  const embed: EmbedBuilder = new EmbedBuilder()
    .setColor(color as ColorResolvable)
    .setTitle(`🎫 ${ticket.name}`)

    .setDescription(
      `
    Criado em: ${ticket.date_creation as Date}
    Prioridade: **${priorityTickets}**
    Status: **${ticket.status_desc}**\n
    **Descrição:**
    ${formattedTable}
    `
    );
  return embed;
}
