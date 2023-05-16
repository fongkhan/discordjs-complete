const variables = require('../utils/variables.js');

module.exports = {
	name: '!commandes',
	async execute(message) {
		if (!message.guild) return;
		message.delete();
		message.channel.send('Voici la liste des commandes disponibles : \n' + variables.command_names.names);
	},
};