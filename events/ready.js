const { Events, ActivityType } = require('discord.js');

// When the client is ready, run this code (only once)
// We use 'c' for the event parameter to keep it separate from the already defined 'client'
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		client.user.setActivity('le cartographe qui me regarde', { type: ActivityType.Watching });
		console.log(`Ready! Logged in as ${client.user.tag}`);
	},
};