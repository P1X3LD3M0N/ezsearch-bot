const fs = require('fs');
const Discord = require('discord.js');
const { Client, Intents } = require('discord.js');

const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});
const { prefix, token } = require('./config.json');

client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync('./commands')
  .filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', () => {
  console.log('Ready!');
  //client.channels.cache.get("884859834166554647").send('HawkD3M0N at your service!');
});

client.on('messageCreate', (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();
  if (!client.commands.has(command)) return;

  try {
    client.commands.get(command).execute(message, args, Discord);
  } catch (error) {
    console.error(error);
    message.reply({
      content: 'there was an error trying to execute that command!',
      allowedMentions: { repliedUser: false },
    });
  }
});

client.login(token);