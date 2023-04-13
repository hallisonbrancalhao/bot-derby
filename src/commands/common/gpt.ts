require("dotenv/config");
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";
import { Command } from "../../common/types/Command";

export default new Command({
  name: "gpt",
  description: "Faça uma pergunta pergunta",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "mensagem",
      description: "Digite sua pesquisa",
      type: ApplicationCommandOptionType.String,
      required: true,
    },
  ],
  async run({ interaction, options }) {
    const query = options.getString("mensagem");
    const { Configuration, OpenAIApi } = require("openai");

    try {
      const configuration = new Configuration({
        apiKey: process.env.GPT_API_TOKEN,
      });
      const openai = new OpenAIApi(configuration);

      const response = await openai
        .createCompletion({
          model: "text-davinci-003",
          prompt: query,
          temperature: 1,
          max_tokens: 7,
        })
        .catch((error: any) => {
          console.log(`OPENAI ERR: ${error}`);
        });
      interaction.reply({ content: response.data.choices[0].text.trim() });
    } catch (error) {
      console.log("run : error:", error);
      interaction.reply("Ocorreu um erro ao processar sua solicitação.");
    }
  },
});
