import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../../common/types/Command";
import {
  getAllTickets,
  getUserGLPI,
  mountTickets,
} from "../../common/services/functions";
import { groupTickets } from "../../common/services/functions/groupTickets";
import { Tickets } from "../../common/types/Ticket";

async function getTickets() {
  return 0;
}
export default new Command({
  name: "tickets",
  description: "Buscar tickets",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "buscar",
      description: "Busque um ticket pelo número",
      type: ApplicationCommandOptionType.Subcommand,
      options: [
        {
          name: "numero",
          description: "Digite o número do ticket",
          type: ApplicationCommandOptionType.Integer,
          required: true,
        },
      ],
    },
    {
      name: "todos",
      description: "Listar todos os tickets",
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],

  async run({ interaction, options }) {
    const subCommand = options.getSubcommand();
    const { user } = interaction;

    switch (subCommand) {
      case "buscar":
        const ticketNumber = options.getInteger("numero");
        // TODO: Implementar busca do ticket by id
        break;

      case "todos":
        const { usernameGLPI } = await getUserGLPI(user.id);
        const tickets: Tickets = await getAllTickets(usernameGLPI);

        const embeds: EmbedBuilder[] = await mountTickets(
          tickets,
          usernameGLPI,
          user
        );
        await interaction.deferReply({ ephemeral: true });
        interaction.editReply({
          embeds: embeds,
        });
        break;

      default:
    }
  },
});
