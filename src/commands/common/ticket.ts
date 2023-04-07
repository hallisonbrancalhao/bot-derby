import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
  Collection,
} from "discord.js";
import { Command } from "../../common/types/Command";
import { switchBuscar } from "../../common/services/functions";
import { switchListar } from "../../common/services/functions/switchListar";
import { switchTecnico } from "../../common/services/functions/switchTecnico";

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
        await switchBuscar(interaction, options);
        break;

      case "listar":
        await switchListar(interaction, user);
        break;

      case "tecnico":
        await switchTecnico(interaction);
        break;

      default:
        interaction.deferReply({ ephemeral: true });
        return interaction.editReply({
          content: "Comando inválido",
        });
    }
  },
});
