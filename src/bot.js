require('dotenv').config() 

const { Client, GatewayIntentBits  } = require('discord.js');
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ],
});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.username}!`)
})

client.on('messageCreate', message => {
    if(message.author.bot) return
    message.reply(`${message.author.username}, oi`)
})

client.login(process.env.DISCORDJS_BOT_TOKEN);
