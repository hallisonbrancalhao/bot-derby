import {
  ColorResolvable,
  EmbedAuthorOptions,
  EmbedBuilder,
  User,
} from "discord.js";
import api from "../config/apiMongoDB";
import { client } from "../../..";

interface Ticket {
  ticket_id: string;
  assunto: string;
  tecnico: string;
}

interface IData {
  tecnico: string | User;
  embed: EmbedBuilder;
}

export async function mountAlertTicket(ticket: Ticket): Promise<IData | null> {
  const embed = new EmbedBuilder();

  const possibility = {
    "Novo chamado": "Blue",
    "Nova tarefa": "Blue",
    "Novo acompanhamento": "Gold",
    "Atualização de uma tarefa": "White",
    "Atualização de um chamado": "White",
    "Encerramento do chamado": "Green",
    "Chamado solucionado": "Green",
    "Exclusão de uma tarefa": "Navy",
  };
  const [subject = "Nova Notificação", color = "Grey"] =
    Object.entries(possibility).find(([p]) => {
      return ticket.assunto.match(p);
    }) ?? [];

  const userLinked = await api.get(`user/${ticket.tecnico}`);

  let user: User | null = null;
  if (userLinked.data) {
    user = await client.users.fetch(userLinked.data.discordId);
    embed.setTitle(`${subject}`);
    embed.addFields({ name: "Responsável", value: `${user}` });
    embed.setAuthor({
      name: user.username,
      iconURL: user.avatarURL() || `https://crefaz.vercel.app/favicon.ico`,
    });
  } else {
    embed.setTitle(`${subject}`);
    embed.setAuthor({
      name: ticket.tecnico,
      iconURL: `https://crefaz.vercel.app/favicon.ico`,
    });
  }
  embed.setFooter({
    text: `Notificação GLPI`,
    iconURL: `https://chamados.crefaz.com.br/plugins/trademark/front/picture.send.php?path=60/63a2522f39f60.png`,
  });

  const descricao = ticket.assunto.replace(/\[GLPI #\d+\]/g, "");

  if (!ticket.assunto.includes("Novo acompanhamento")) {
    return null;
  }

  const linkTicket = `https://chamados.crefaz.com.br/front/ticket.form.php?id=${ticket.ticket_id}`;
  const formatedDescription = descricao.replace(subject, "");
  const mensageEmbed = `🎫 [${ticket.ticket_id}](${linkTicket})\n${formatedDescription}`;

  embed.setDescription(mensageEmbed);
  embed.setTimestamp();
  embed.setColor(color as ColorResolvable);

  const tecnico = user ? user : ticket.tecnico;
  const data: IData = { tecnico, embed };
  return data;
}
