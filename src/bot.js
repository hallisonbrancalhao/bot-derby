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
    message.reply({
        content: 'Olá!',
        allowedMentions: {
            repliedUser: true
        }
    })
})

client.login(process.env.BOT_TOKEN);
