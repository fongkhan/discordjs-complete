// Require the necessary discord.js classes and files
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');
const functions = require('./utils/functions.js');
const variables = require('./utils/variables.js');

// Create a new client instance
const client = new Client({
	intents: [
		GatewayIntentBits.DirectMessages,
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildVoiceStates,
	],
});

// create a new collection for the commands and the messContent
client.commands = new Collection();

// Read all the files in the commands folder to add them to the client.commands Collection
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

// Loop over all the files in the commands folder and add them to the client.commands Collection
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		client.commands.set(command.data.name, command);
	}
	// If the command is missing a required property, log a warning to the console
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

client.mcCommands = new Collection();

const messContentPath = path.join(__dirname, 'messContent');
const messContentFiles = fs.readdirSync(messContentPath).filter(file => file.endsWith('.js'));
for (const file of messContentFiles) {
	const filePath = path.join(messContentPath, file);
	const command = require(filePath);
	if ('execute' in command) {
		client.mcCommands.set(command.name, command);
		variables.command_names.names = variables.command_names.names + ' / ' + command.name;
	}
	else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "execute" property.`);
	}
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	}
	else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}


// Log in to Discord with your client's token
client.login(token);

// set interval to deconnect the bot with functions.deco() if no activity with variables.lastActivityTimestamp.value for last activity and variables.lastActivityTimestamp.interval for the interval
setInterval(() => {
	if (variables.lastActivityTimestamp.value) {
		if (Date.now() - variables.lastActivityTimestamp.value > variables.lastActivityTimestamp.interval) {
			functions.deco(null, variables.audioPlayer.connection.joinConfig.channelId);
		}
	}
}, variables.lastActivityTimestamp.interval); 