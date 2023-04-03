import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  EmbedBuilder,
} from "discord.js";
import { Command } from "../../common/types/Command";
import { getAllTickets, getUserGLPI } from "../../common/services/functions";

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
        const { tickets } = await getAllTickets(usernameGLPI);

        let myTickets: any = [];
        tickets.forEach((ticket: any) => {
          myTickets +=
            "🎫 " +
            `[${ticket.id}]` +
            `(https://chamados.crefaz.com.br/front/ticket.form.php?id=${ticket.id})` +
            " - " +
            ticket.name +
            "\n";
        });

        const embed = new EmbedBuilder()
          .setTitle("Todos os seus tickets")
          .setDescription(myTickets)
          .setColor("Aqua")
          .setAuthor({
            name: user.username,
            iconURL: user.avatarURL() || undefined,
          });

        await interaction.deferReply({ ephemeral: false });
        interaction.editReply({ embeds: [embed] });
        break;

      default:
    }
  },
});
