const { Events } = require('discord.js');
const functions = require('./../utils/functions.js');

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		functions.changeActivity(true, client, "Watching", 'Ouioui');
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};