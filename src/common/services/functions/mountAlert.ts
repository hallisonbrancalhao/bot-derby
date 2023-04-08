import { ColorResolvable, EmbedBuilder } from "discord.js";

interface Ticket {
  ticket_id: string;
  assunto: string;
  tecnico: string;
}

export function mountAlertTicket(ticket: Ticket): EmbedBuilder {
  const embed = new EmbedBuilder()
    .setDescription(`🎫 [${ticket.ticket_id}](https://chamados.crefaz.com.br/front/ticket.form.php?id=${ticket.ticket_id})\n
    ${ticket.assunto}`);

  let cor: ColorResolvable;

  const possibilidades = [
    "Novo chamado",
    "Nova tarefa",
    "Atualização de uma tarefa",
    "Atualização de um chamado",
    "Encerramento do chamado",
    "Novo acompanhamento",
    "Chamado solucionado",
  ];

  let correspondencia: string | undefined;

  for (let i = 0; i < possibilidades.length; i++) {
    if (ticket.assunto.includes(possibilidades[i])) {
      correspondencia = possibilidades[i];
      break;
    }
  }

  if (correspondencia) {
    cor = getCorPorAssunto(correspondencia);
  } else {
    cor = "Grey";
  }

  embed.setColor(cor).setTitle(`${ticket.tecnico}  - ${correspondencia}`);

  return embed;
}

function getCorPorAssunto(assunto: string): ColorResolvable {
  switch (assunto) {
    case "Novo chamado":
      return "Blue";
    case "Nova tarefa":
      return "Aqua";
    case "Atualização de uma tarefa":
      return "White";
    case "Atualização de um chamado":
      return "White";
    case "Encerramento do chamado":
      return "DarkGreen";
    case "Novo acompanhamento":
      return "Red";
    case "Chamado solucionado":
      return "Green";
    default:
      return "Default";
  }
}
