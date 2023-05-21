const { SlashCommandBuilder } = require('discord.js');
const lists = require('../utils/arhen.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('action')
		.setDescription('joue avec Arhen'),
	async execute(interaction) {
		const Reponse = lists.actions[Math.floor(Math.random() * lists.actions.length)];
		await interaction.reply(Reponse);
	},
};