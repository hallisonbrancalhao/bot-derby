import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { Command } from "../../common/types/Command";
import {
  getAllTickets,
  getAllUsers,
  getUserGLPI,
  mountTicketsList,
  switchBuscar,
} from "../../common/services/functions";
import { Tickets } from "../../common/types/Ticket";
import { switchListar } from "../../common/services/functions/switchListar";

export default new Command({
  name: "tickets",
  description: "Buscar tickets",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "listar",
      description: "Lista todos os tickets",
      type: ApplicationCommandOptionType.Subcommand,
    },
    {
      name: "buscar",
      description: "Busca um ticket pelo número",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "numero",
          description: "Digite o número do ticket",
          type: ApplicationCommandOptionType.String,
          required: true,
        },
      ],
    },
    {
      name: "tecnico",
      description: "Lista todos os tickets de um técnico",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
  async run({ interaction, options }) {
    const subCommand = options.getSubcommand();
    const { user } = interaction;

    switch (subCommand) {
      case "buscar":
        //TODO: Rota pra retornar o nome do Responsável via ID
        const ticketNumber = options.getString("numero");
        await switchBuscar(ticketNumber!, interaction);
        break;

      case "listar":
        await switchListar(interaction, user);
        break;

      case "tecnico":
        const { data } = await getAllUsers();
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
        break;

      default:
        interaction.deferReply({ ephemeral: true });
        return interaction.editReply({
          content: "Comando inválido",
        });
    }
  },
});
