import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  ApplicationCommandType,
  ComponentType,
  DateResolvable,
  EmbedBuilder,
  StringSelectMenuBuilder,
} from "discord.js";
import { Command } from "../../common/types/Command";
import {
  getAllTickets,
  getAllUsers,
  getTicket,
  getUserGLPI,
  mountTickets,
} from "../../common/services/functions";
import { Tickets } from "../../common/types/Ticket";

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
        if (!ticketNumber) {
          return interaction.reply({
            content: "É necessario inserir o numero do ticket",
          });
        }
        const ticket = await getTicket(ticketNumber);
        const ticketEmbed: EmbedBuilder = new EmbedBuilder()
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
        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({
          embeds: [ticketEmbed],
        });
        break;

      case "listar":
        const { usernameGLPI } = await getUserGLPI(user.id);
        console.log("run : usernameGLPI:", usernameGLPI);
        if (!usernameGLPI) {
          await interaction.deferReply({ ephemeral: true });
          return interaction.editReply({
            content:
              "Você ainda não possui o usuário vinculado, use o comando `/help` para mais informações",
          });
        }
        const tickets: Tickets = await getAllTickets(usernameGLPI);
        console.log("run : tickets:", tickets);

        const embeds: EmbedBuilder[] = await mountTickets(
          tickets,
          usernameGLPI
        );
        await interaction.deferReply({ ephemeral: true });
        interaction.editReply({
          embeds: embeds,
        });
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
          const tecnicoEmbeds: EmbedBuilder[] = await mountTickets(
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
    }
  },
});
