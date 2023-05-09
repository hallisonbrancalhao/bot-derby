import { TextChannel } from "discord.js";

import { client } from "../..";

const TARGET_CHANNEL = "💬chatbot";

export class Gpt {
  public async start() {
    client.on("messageCreate", async (message) => {
      if (!message.guild || message.author.bot) return;

      const channel = message.channel as TextChannel;
      if (channel.name !== TARGET_CHANNEL) return;

      const query = message.content.trim();
      const response = await generateOpenAIResponse(query);
      try {
        message.reply(response);
      } catch (error) {
        message.reply("Resposta muito longa para o Discord");
      }
    });
  }
}

const generateOpenAIResponse = async (prompt: string): Promise<string> => {
  const { Configuration, OpenAIApi } = require("openai");

  try {
    const configuration = new Configuration({
      apiKey: process.env.GPT_API_TOKEN,
    });
    const openai = new OpenAIApi(configuration);

    const response = await openai
      .createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 1.2,
        max_tokens: 800,
      })
      .catch((error: any) => {
        console.log(`OPENAI ERR: ${error}`);
      });
    const answer = response.data.choices[0].text.trim();
    return answer;
  } catch (error) {
    console.error("Error generating response from OpenAI API:", error);
    return "Desculpe, ocorreu um erro ao gerar a resposta. Por favor, tente novamente.";
  }
};
