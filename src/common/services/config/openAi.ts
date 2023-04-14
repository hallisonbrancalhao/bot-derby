const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  organization: process.env.GPT_ORG as string,
  apiKey: process.env.GPT_API_TOKEN as string,
});

const openai = new OpenAIApi(configuration);
