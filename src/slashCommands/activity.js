const { SlashCommandBuilder } = require('discord.js');
const functions = require('../utils/functions.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('activity')
		.setDescription('Set the activity of the bot')
		.addStringOption(option => 
			option.setName('activite')
				.setDescription('Le type d\'activité à indiquer')
				.setRequired(true)
				.addChoices(
					{ name: 'Playing', value: 'Playing' },
					{ name: 'Streaming', value: 'Streaming' },
					{ name: 'Listening', value: 'Listening' },
					{ name: 'Watching', value: 'Watching' },
					{ name: 'Custom', value: 'Custom' },
					{ name: 'Competing', value: 'Competing' }
				))
		.addStringOption(option =>
			option.setName('message')
				.setDescription('texte à indiquer après l\'activité')
				.setRequired(true)),
	async execute(interaction) {
		const activity = interaction.options.getString('activite');
		const message = interaction.options.getString('message');
		if (!interaction.member.permissions.has('ADMINISTRATOR')) {
			return interaction.reply({content: 'Seuls les administrateurs peuvent changer l\'activité du bot.', ephemeral: true});
		}
		functions.changeActivity(false, interaction, activity, message);
	},
};