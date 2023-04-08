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

  try {
    data.forEach((tecnico: any) => {
      tecnicos.push({
        label: ` 👤 ${tecnico.usernameGLPI}`,
        value: tecnico.usernameGLPI,
        description: tecnico.usernameGLPI,
      });
    });

    const row = new ActionRowBuilder<StringSelectMenuBuilder>({
      components: [
        new StringSelectMenuBuilder({
          custom_id: "select-tecnic",
          placeholder: "👉 Selecione um técnico",
          options: tecnicos,
        }),
      ],
    });

    const select = await interaction.deferReply({ ephemeral: true });
    interaction.editReply({
      components: [row],
    });

    const colector = select.createMessageComponentCollector({
      componentType: ComponentType.StringSelect,
    });

    colector.on("collect", async (selectInteraction) => {
      const value = selectInteraction.values[0];
      if (!value) return;
      const ticketsTecnico: Tickets = await getAllTickets(value);
      if (ticketsTecnico.length === 0) return;
      const tecnicoEmbeds: EmbedBuilder[] = await mountTicketsList(
        ticketsTecnico,
        value
      );
      await selectInteraction.deferReply({ ephemeral: true });
      selectInteraction.editReply({
        embeds: tecnicoEmbeds,
      });
    });
  } catch (error) {
    console.log("Erro 405".red);
    return interaction.reply({
      content: "Não foi possível encontrar o técnico",
      ephemeral: true,
    });
  }
}
