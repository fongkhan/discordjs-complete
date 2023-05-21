const { Events } = require('discord.js');

module.exports = {
	name: 'messageCreate', //Events.messageCreate
	async execute(message) {
		if (message.author.bot) return;
		const messContent = message.content.toLowerCase();
		const mcAnswer = Array.from(message.client.mcCommands.keys());
		//const command = message.client.mcCommands.get(messContent);
		try {
			for (let i = 0; i < mcAnswer.length; i++) {
				if (messContent.includes(mcAnswer[i])) {
					const command = message.client.mcCommands.get(mcAnswer[i]);
					await command.execute(message);
				}
			}
		}
		catch (error) {
			console.error(`Error executing ${messContent}`);
			console.error(error);
		}
	},
};