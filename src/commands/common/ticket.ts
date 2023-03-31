import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";
import { connection } from "../../structs/database/connect";
import { Command } from "../../structs/types/Command";

async function getTickets() {
  const tickets = await connection.query("SELECT * FROM ordem LIMIT 5", () => {
    console.log("Foi");
  });

  return tickets.results;
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

    switch (subCommand) {
      case "buscar":
        const ticketNumber = options.getInteger("numero");
        // TODO: Implementar busca do ticket by id
        break;
      case "todos":
        // TODO: Implementar lista de todos os tickets
        break;
      default:
    }

    const text = options.getString("texto", true);

    await interaction.deferReply({ ephemeral: true });
    interaction.editReply({
      content:
        `Ticket: ${text}` +
        (await getTickets().then((res) => JSON.stringify(res))),
    });
  },
});
