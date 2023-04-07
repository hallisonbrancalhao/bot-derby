import {
  ActionRowBuilder,
  CommandInteraction,
  ComponentType,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { getAllUsers } from "./apiMongoDB";
import { Tickets } from "../../types/Ticket";
import { getAllTickets } from "./apiCrefaz";
import { mountTicketsList } from "./mountTicketsList";

export async function switchTecnico(interaction: CommandInteraction) {
  const { data } = await getAllUsers();

  if (!data) {
    return interaction.reply({
      content: "Não existem usuários cadastrados",
      ephemeral: true,
    });
  }

  let tecnicos: any = [];

  data.forEach((tecnico: any) => {
    tecnicos.push({
      label: tecnico.usernameGLPI,
      value: tecnico.usernameGLPI,
    });
  });

  const row = new ActionRowBuilder<StringSelectMenuBuilder>({
    components: [
      new StringSelectMenuBuilder({
        custom_id: "select-tecnic",
        placeholder: "Selecione um técnico",
        options: tecnicos,
      }),
    ],
  });

  const select = await interaction.reply({
    components: [row],
    fetchReply: true,
  });

  const colector = select.createMessageComponentCollector({
    componentType: ComponentType.StringSelect,
  });

  colector.on("collect", async (selectInteraction) => {
    const value = selectInteraction.values[0];
    const ticketsTecnico: Tickets = await getAllTickets(value);
    const tecnicoEmbeds: EmbedBuilder[] = await mountTicketsList(
      ticketsTecnico,
      value
    );
    await selectInteraction.deferReply({ ephemeral: true });
    selectInteraction.editReply({
      embeds: tecnicoEmbeds,
      components: [],
    });
  });
}
