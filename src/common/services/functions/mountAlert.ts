import { ColorResolvable, EmbedBuilder } from "discord.js";

interface Ticket {
  ticket_id: string;
  assunto: string;
  tecnico: string;
}

export function mountAlertTicket(ticket: Ticket): EmbedBuilder {
  const embed = new EmbedBuilder().setDescription(`🎫 [${
    ticket.ticket_id
  }](https://chamados.crefaz.com.br/front/ticket.form.php?id=${
    ticket.ticket_id
  })\n
    ${ticket.assunto.replace(/\[GLPI #\d+\]/g, "")}`);
  const possibility = {
    "Novo chamado": "Blue",
    "Nova tarefa": "Blue",
    "Novo acompanhamento": "Yellow",
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

  embed
    .setColor(color as ColorResolvable)
    .setTitle(`${ticket.tecnico}  - ${subject}`);

  return embed;
}
