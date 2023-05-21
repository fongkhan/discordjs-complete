const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('you')
		.setDescription('you'),
	async execute(interaction) {
		await interaction.reply('NO YOU !');
	},
};